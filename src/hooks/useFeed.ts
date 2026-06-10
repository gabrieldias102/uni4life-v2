import { useEffect, useState } from "react";
import { ApiError } from "../services/api";
import { getMainFeed } from "../services/posts";
import type { PostRead } from "../services/socialApi.types";

export function useFeed(userUid: string | undefined) {
  const [posts, setPosts] = useState<PostRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userUid) {
      setPosts([]);
      setError("Usuario autenticado nao encontrado.");
      setLoading(false);
      return;
    }

    const currentUserUid = userUid;

    async function fetchFeed() {
      try {
        setLoading(true);
        setError(null);

        const fetchedPosts = await getMainFeed(currentUserUid);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Erro ao buscar o feed principal:", err);

        if (err instanceof ApiError) {
          setError(
            `Nao foi possivel carregar o feed. Status ${err.status}: ${err.message}`
          );
          return;
        }

        setError("Nao foi possivel carregar o feed.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [userUid]);

  return { posts, loading, error };
}
