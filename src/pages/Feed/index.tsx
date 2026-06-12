import FriendsCard from "../../components/FriendsCard";
import ProfileCard from "../../components/ProfileCard";
import ProfilePostList from "../../components/ProfilePostList";
import { ThemeToggle } from "../../components/ThemeTogle";
import { useAuth } from "../../contexts/useAuth";
import { useConnections } from "../../hooks/useConnections";
import { useFeed } from "../../hooks/useFeed";
import { mapSuggestionToFriendCard } from "../../utils/friendsCardMappers";

export default function Feed() {
  const { user } = useAuth();
  const { posts, loading, error } = useFeed(user?.uid);
  const {
    suggestions,
    loading: connectionsLoading,
    error: connectionsError,
    connect,
    connectingUserUids,
  } = useConnections(user?.uid);
  const suggestionCards = suggestions.slice(0, 4).map(mapSuggestionToFriendCard);

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-4 lg:gap-8">
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
            <div className="rounded-3xl bg-cards p-5 shadow-md">
              <h2 className="mb-2 text-lg font-bold text-text-primary">
                Pessoas para conhecer
              </h2>

              <div className="mt-5 space-y-3">
                {connectionsLoading ? (
                  <p className="text-sm text-text-tertiary">Carregando sugestoes...</p>
                ) : null}
                {!connectionsLoading && !suggestionCards.length ? (
                  <p className="text-sm text-text-tertiary">
                    Nenhuma sugestao disponivel no momento.
                  </p>
                ) : null}
                {suggestionCards.map((person) => (
                  <FriendsCard
                    key={person.targetUid}
                    compact
                    {...person}
                    onConnect={connect}
                    isSubmitting={connectingUserUids.includes(person.targetUid ?? "")}
                  />
                ))}
                {connectionsError ? (
                  <p className="text-sm text-red-600">{connectionsError}</p>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl bg-cards p-5 shadow-md">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-3 text-primary">
                  *
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-text-primary">
                    Semana Academica
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    De 17 a 21 de marco - palestras, workshops e networking.
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
      <footer className="fixed bottom-5 right-5 z-50 hidden sm:block">
        <ThemeToggle/>
      </footer>
    </main>
  );
}
