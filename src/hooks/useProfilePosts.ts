import { useMemo } from "react";
import type { ProfilePostView } from "../components/ProfilePostSwitcher";
import {
  getProfilePostsByType,
} from "../mocks/profilePosts";

export function useProfilePosts(
  userId: string | undefined,
  activeView: ProfilePostView
) {
  const isAuthenticated = Boolean(userId);

  const posts = useMemo(() => {
    if (!isAuthenticated) {
      return [];
    }

    return getProfilePostsByType(activeView);
  }, [activeView, isAuthenticated]);

  const loading = false;
  const error = isAuthenticated ? null : "Usuario nao autenticado.";

  return { posts, loading, error };
}
