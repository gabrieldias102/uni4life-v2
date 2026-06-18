import { useAuth } from "../../contexts/useAuth";
import { useConnections } from "../../hooks/useConnections";
import { useUserProfile } from "../../hooks/useUserProfile";
import { mapConnectionToFriendCard } from "../../utils/friendsCardMappers";

type ProfileCardProps = {
  showEmail?: boolean;
  compact?: boolean;
};

export default function ProfileCard({
  showEmail = true,
  compact = false,
}: ProfileCardProps) {
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile(user?.uid);
  const {
    connections,
    loading: connectionsLoading,
    error: connectionsError,
  } = useConnections(user?.uid);

  const displayName =
    profile?.full_name?.trim() || user?.displayName?.trim() || "Usuario";
  const courseLabel = profile?.course || "Curso não informado";
  const email = user?.email || "Email não informado";
  const avatarSeed = encodeURIComponent(displayName || email);
  const avatarUrl =
    user?.photoURL ||
    `https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`;
  const memberSince = user?.metadata.creationTime
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(user.metadata.creationTime))
    : "não informado";

  const totalPosts = profile?.post_count ?? 0;
  const totalConnections = profile?.connection_count ?? 0;
  const recentConnections = connections
    .slice(0, 3)
    .map((connection) => mapConnectionToFriendCard(connection, user?.uid));

  if (loading) {
    return (
      <div className="w-full rounded-2xl bg-cards p-4 shadow-md">
        Carregando perfil...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full rounded-2xl bg-cards p-4 shadow-md">
        {error || "Erro ao carregar perfil."}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="w-full rounded-2xl bg-cards p-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-avatar border border-muted/20 rounded-full h-12 w-12 shrink-0 flex items-center justify-center">
            <img
              src={avatarUrl}
              alt={`Avatar de ${displayName}`}
              className="object-cover w-full h-full rounded-full" 
            />
          </div>  

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-text-primary">
              {displayName}
            </h1>
            <p className="truncate text-sm text-text-secondary">{courseLabel}</p>
            {showEmail ? (
              <p className="truncate text-sm text-text-secondary">{email}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-highlight p-3 text-center text-sm text-text-secondary">
          <div>
            <p className="text-xl font-bold text-text-primary">{totalPosts}</p>
            <p>Publicações</p>
          </div>
          <div>
            <p className="text-xl font-bold text-text-primary">{totalConnections}</p>
            <p>Conexões</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Conexões recentes
          </p>
          {connectionsLoading ? (
            <p className="text-sm text-text-tertiary">Carregando conexões...</p>
          ) : null}
          {!connectionsLoading && !recentConnections.length ? (
            <p className="text-sm text-text-tertiary">
              Voce ainda não possui conexões recentes.
            </p>
          ) : null}
          {recentConnections.map((connection) => (
            <div key={connection.nome} className="flex items-center gap-3">
              <div className="bg-avatar border border-muted/20 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                <img
                  src={connection.avatar}
                  alt={connection.nome}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {connection.nome}
                </p>
                <p className="text-xs text-text-tertiary">{connection.curso}</p>
              </div>
            </div>
          ))}
          {connectionsError ? (
            <p className="text-sm text-red-600">{connectionsError}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-cards p-4 shadow-md sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-avatar border border-muted/20 rounded-full h-20 w-20 shrink-0 flex items-center justify-center">
            <img
              src={avatarUrl}
              alt={`Avatar de ${displayName}`}
              className="object-cover w-full h-full rounded-full" 
            />
          </div>  

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-text-primary">
              {displayName}
            </h1>
            <p className="truncate text-sm text-text-secondary">{courseLabel}</p>
            {showEmail ? (
              <p className="truncate text-sm text-text-secondary">{email}</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3 text-sm text-text-secondary">
          <p>Desde: {memberSince}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-highlight p-4 text-center shadow-sm sm:p-6">
          <div>
            <p className="text-2xl font-bold text-text-primary">{totalPosts}</p>
            <p className="text-sm text-text-tertiary">Publicações</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{totalConnections}</p>
            <p className="text-sm text-text-tertiary">Conexões</p>
          </div>
        </div>

        <div className="rounded-2xl bg-highlight p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Conexões recentes
          </p>
          <div className="space-y-3">
            {connectionsLoading ? (
              <p className="text-sm text-text-tertiary">Carregando conexões...</p>
            ) : null}
            {!connectionsLoading && !recentConnections.length ? (
              <p className="text-sm text-text-tertiary">
                Voce ainda não possui conexões recentes.
              </p>
            ) : null}
            {recentConnections.map((connection) => (
              <div key={connection.nome} className="flex items-center gap-3">
                <div className="bg-avatar border border-muted/20 rounded-full h-11 w-11 shrink-0 flex items-center justify-center">
                  <img
                    src={connection.avatar}
                    alt={connection.nome}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {connection.nome}
                  </p>
                  <p className="text-xs text-text-tertiary">{connection.curso}</p>
                </div>
              </div>
            ))}
            {connectionsError ? (
              <p className="text-sm text-red-600">{connectionsError}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
