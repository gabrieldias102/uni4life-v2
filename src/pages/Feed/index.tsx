import { useAuth } from "../../contexts/useAuth";
import ProfileCard from "../../components/ProfileCard";
import FriendsCard from "../../components/FriendsCard";
import ProfilePostList from "../../components/ProfilePostList";
import { useProfilePosts } from "../../hooks/useProfilePosts";
import { getConnectionsByType } from "../../mocks/connections";

export default function Feed() {
  const { user } = useAuth();
  const { posts, loading, error } = useProfilePosts(user?.uid, "published");

  const suggestions = getConnectionsByType("conectar").slice(0, 4);

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl grid gap-6 lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <ProfileCard compact showEmail={false} />
          </div>
        </aside>

        <section className="lg:col-span-2">
          <ProfilePostList posts={posts} loading={loading} error={error} />
        </section>

        <aside className="lg:w-96">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow-md border border-gray-100">
              <h2 className="mb-2 text-lg font-bold text-black">
                Pessoas para conhecer
              </h2>

              <div className="mt-5 space-y-3">
                {suggestions.map((person) => (
                  <FriendsCard
                    key={`${person.tipo}-${person.nome}`}
                    compact
                    {...person}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-md border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-3 text-primary">
                  🎓
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-black">
                    Semana Acadêmica
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    De 17 a 21 de março — palestras, workshops e networking.
                    Inscreva-se agora!
                  </p>
                </div>
              </div>
              <button className="mt-5 block w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
                Saiba mais
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
