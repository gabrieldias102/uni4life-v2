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
    <>
      <ProfileCard />
      <ProfilePostSwitcher value={activeView} onChange={setActiveView} />
      <ProfilePostList posts={posts} loading={loading} error={error} />
    </>
  );
}
