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
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <ProfileCard />
      <ProfilePostSwitcher value={activeView} onChange={setActiveView} />
      <ProfilePostList posts={posts} loading={loading} error={error} />
    </div>
  );
}
