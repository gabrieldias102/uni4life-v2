import { useState } from "react";
import ProfilePostList from "../../components/ProfilePostList";
import ProfileCard from "../../components/ProfileCard";
import ProfilePostSwitcher, {
  type ProfilePostView,
} from "../../components/ProfilePostSwitcher";
import { useAuth } from "../../contexts/useAuth";
import { useProfilePosts } from "../../hooks/useProfilePosts";

export default function Profile() {
  const [activeView, setActiveView] = useState<ProfilePostView>("published");
  const { user } = useAuth();
  const { posts, loading, error } = useProfilePosts(user?.uid, activeView);

  return (
    <main className="min-h-screen px-3 pb-8 pt-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Meu Perfil
          </h1>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Mobile
          </span>
        </header>

        <ProfileCard />
        <ProfilePostSwitcher value={activeView} onChange={setActiveView} />
        <ProfilePostList posts={posts} loading={loading} error={error} />
      </div>
    </main>
  );
}
