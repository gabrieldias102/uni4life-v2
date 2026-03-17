import { useEffect, useState } from "react";
import type { ProfilePostView } from "../components/ProfilePostSwitcher";
import {
  getProfilePostsByType,
  type MockProfilePost,
} from "../mocks/profilePosts";

export function useProfilePosts(
  userId: string | undefined,
  activeView: ProfilePostView
) {
  const [posts, setPosts] = useState<MockProfilePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setLoading(false);
      setError("Usuario nao autenticado.");
      return;
    }

    setLoading(true);
    setError(null);

    const timeoutId = window.setTimeout(() => {
      setPosts(getProfilePostsByType(activeView));
      setLoading(false);
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [activeView, userId]);

  return { posts, loading, error };
}
