import { useEffect, useState } from "react";
import { ApiError } from "../services/api";
import { getUser } from "../services/users";
import type { UserRead } from "../services/socialApi.types";

export function useUserProfile(userUid: string | undefined) {
  const [profile, setProfile] = useState<UserRead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userUid) {
      setProfile(null);
      setError("Usuario autenticado nao encontrado.");
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);

        const data = await getUser(userUid);
        setProfile(data);
      } catch (err) {
        setProfile(null);

        if (err instanceof ApiError) {
          console.error("Erro ao buscar perfil na API:", {
            userUid,
            status: err.status,
            message: err.message,
            details: err.details,
          });
          setError(
            `Nao foi possivel carregar o perfil. Status ${err.status}: ${err.message}`
          );
          return;
        }

        console.error("Erro inesperado ao buscar perfil:", {
          userUid,
          error: err,
        });
        setError("Nao foi possivel carregar o perfil.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userUid]);

  return { profile, loading, error };
}
