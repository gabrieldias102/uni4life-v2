import { useEffect, useState, useMemo } from "react";
import type { ProfilePostView } from "../components/ProfilePostSwitcher";
import { listUserPosts } from "../services/posts";
import type { PostRead } from "../services/socialApi.types"; // Agora este tipo está correto

export function useProfilePosts(
  userUid: string | undefined,
  activeView: ProfilePostView
) {
  const [allPosts, setAllPosts] = useState<PostRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userUid) {
      setLoading(false);
      return;
    }

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const uid = userUid;
        if (!uid) return;
        const fetchedPosts = await listUserPosts(uid);
        setAllPosts(fetchedPosts);
      } catch (err) {
        console.error("Erro ao buscar as publicações:", err);
        setError("Não foi possível carregar as publicações.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userUid]);

  const filteredPosts = useMemo(() => {
    if (activeView === "published") {
   
      return allPosts.filter((post) => post.repost_of === null);
    }
    if (activeView === "republished") {
     
      return allPosts.filter((post) => post.repost_of !== null);
    }
    return [];
  }, [allPosts, activeView]);

  return { posts: filteredPosts, loading, error };
}