import { useEffect, useState } from "react";
import { ApiError } from "../services/api";
import {
  createConnection,
  getUserSuggestions,
  listConnections,
} from "../services/users";
import type { ConnectionRead, UserRead } from "../services/socialApi.types";

export function useConnections(userUid: string | undefined) {
  const [suggestions, setSuggestions] = useState<UserRead[]>([]);
  const [connections, setConnections] = useState<ConnectionRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectingUserUids, setConnectingUserUids] = useState<string[]>([]);

  useEffect(() => {
    if (!userUid) {
      setSuggestions([]);
      setConnections([]);
      setError("Usuario autenticado nao encontrado.");
      setLoading(false);
      return;
    }

    const currentUserUid = userUid;

    async function fetchConnectionsData() {
      try {
        setLoading(true);
        setError(null);

        const [suggestionsData, connectionsData] = await Promise.all([
          getUserSuggestions(currentUserUid),
          listConnections(currentUserUid),
        ]);

        setSuggestions(suggestionsData);
        setConnections(connectionsData);
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
  }, [userUid]);

  async function connect(targetUid: string) {
    if (!userUid || connectingUserUids.includes(targetUid)) {
      return;
    }

    try {
      setConnectingUserUids((current) => [...current, targetUid]);
      setError(null);

      const createdConnection = await createConnection(userUid, targetUid);

      setSuggestions((current) =>
        current.filter((suggestion) => suggestion.user_uid !== targetUid)
      );
      setConnections((current) => [createdConnection, ...current]);
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
  };
}
