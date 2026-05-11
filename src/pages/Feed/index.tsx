import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import ProfileCard from "../../components/ProfileCard";
import ProfilePostList from "../../components/ProfilePostList";
import ProfilePostSwitcher, {
  type ProfilePostView,
} from "../../components/ProfilePostSwitcher";
import { useProfilePosts } from "../../hooks/useProfilePosts";

export default function Feed() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<ProfilePostView>("published");
  const { posts, loading, error } = useProfilePosts(user?.uid, activeView);

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid gap-6 lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <ProfileCard compact showEmail={false} />
          </div>
        </aside>

        <section className="lg:col-span-2">
          <ProfilePostSwitcher value={activeView} onChange={setActiveView} />
          <ProfilePostList posts={posts} loading={loading} error={error} />
        </section>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-bold text-black">Sugestões</h2>
            <p className="text-sm text-gray-600">
              Aqui você pode adicionar sugestões de conexões ou eventos mais
              tarde.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
