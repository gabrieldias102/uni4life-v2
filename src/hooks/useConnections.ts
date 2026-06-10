import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/api";
import {
  createConnection,
  getUserSuggestions,
  listConnections,
} from "../services/users";
import type { ConnectionRead, UserRead } from "../services/socialApi.types";

const connectionStore = new Map<
  string,
  {
    suggestions: UserRead[];
    connections: ConnectionRead[];
  }
>();

const connectionListeners = new Map<string, Set<() => void>>();

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function emitConnectionsChange(userUid: string) {
  const listeners = connectionListeners.get(userUid);

  if (!listeners) {
    return;
  }

  listeners.forEach((listener) => {
    listener();
  });
}

function subscribeToConnections(userUid: string, listener: () => void) {
  const listeners = connectionListeners.get(userUid) ?? new Set<() => void>();
  listeners.add(listener);
  connectionListeners.set(userUid, listeners);

  return () => {
    const currentListeners = connectionListeners.get(userUid);

    if (!currentListeners) {
      return;
    }

    currentListeners.delete(listener);

    if (!currentListeners.size) {
      connectionListeners.delete(userUid);
    }
  };
}

export function useConnections(userUid: string | undefined) {
  const cachedData = userUid ? connectionStore.get(userUid) : undefined;
  const [suggestions, setSuggestions] = useState<UserRead[]>(
    cachedData?.suggestions ?? []
  );
  const [connections, setConnections] = useState<ConnectionRead[]>(
    cachedData?.connections ?? []
  );
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);
  const [connectingUserUids, setConnectingUserUids] = useState<string[]>([]);

  const applyConnectionsData = useCallback(
    (currentUserUid: string, nextSuggestions: UserRead[], nextConnections: ConnectionRead[]) => {
      connectionStore.set(currentUserUid, {
        suggestions: nextSuggestions,
        connections: nextConnections,
      });
      setSuggestions(nextSuggestions);
      setConnections(nextConnections);
      emitConnectionsChange(currentUserUid);
    },
    []
  );

  const syncFromStore = useCallback(() => {
    if (!userUid) {
      return;
    }

    const storedData = connectionStore.get(userUid);

    if (!storedData) {
      return;
    }

    setSuggestions(storedData.suggestions);
    setConnections(storedData.connections);
  }, [userUid]);

  const refreshConnections = useCallback(
    async (currentUserUid: string, options?: { retries?: number; delayMs?: number }) => {
      const retries = options?.retries ?? 0;
      const delayMs = options?.delayMs ?? 0;

      for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
          const [suggestionsData, connectionsData] = await Promise.all([
            getUserSuggestions(currentUserUid),
            listConnections(currentUserUid),
          ]);

          applyConnectionsData(currentUserUid, suggestionsData, connectionsData);
          return;
        } catch (err) {
          const isLastAttempt = attempt === retries;

          if (isLastAttempt) {
            throw err;
          }

          await wait(delayMs);
        }
      }
    },
    [applyConnectionsData]
  );

  useEffect(() => {
    if (!userUid) {
      setSuggestions([]);
      setConnections([]);
      setError("Usuario autenticado nao encontrado.");
      setLoading(false);
      return;
    }

    const currentUserUid = userUid;

    syncFromStore();

    const unsubscribe = subscribeToConnections(currentUserUid, syncFromStore);

    async function fetchConnectionsData() {
      try {
        setLoading(true);
        setError(null);
        await refreshConnections(currentUserUid);
      } catch (err) {
        console.error("Erro ao carregar conexoes:", err);

        if (err instanceof ApiError) {
          setError(
            `Nao foi possivel carregar as conexoes. Status ${err.status}: ${err.message}`
          );
          return;
        }

        setError("Nao foi possivel carregar as conexoes.");
      } finally {
        setLoading(false);
      }
    }

    fetchConnectionsData();

    return unsubscribe;
  }, [refreshConnections, syncFromStore, userUid]);

  async function connect(targetUid: string) {
    if (!userUid || connectingUserUids.includes(targetUid)) {
      return;
    }

    try {
      setConnectingUserUids((current) => [...current, targetUid]);
      setError(null);

      await createConnection(userUid, targetUid);
      await refreshConnections(userUid, { retries: 3, delayMs: 400 });
    } catch (err) {
      console.error("Erro ao criar conexao:", err);

      if (err instanceof ApiError) {
        setError(
          `Nao foi possivel criar a conexao. Status ${err.status}: ${err.message}`
        );
        return;
      }

      setError("Nao foi possivel criar a conexao.");
    } finally {
      setConnectingUserUids((current) =>
        current.filter((userId) => userId !== targetUid)
      );
    }
  }

  return {
    suggestions,
    connections,
    loading,
    error,
    connect,
    connectingUserUids,
    refreshConnections,
  };
}
