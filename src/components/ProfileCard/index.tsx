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
  const courseLabel = profile?.course || "Curso nao informado";
  const email = user?.email || "Email nao informado";
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
    : "Nao informado";

  const totalPosts = profile?.post_count ?? 0;
  const totalConnections = profile?.connection_count ?? 0;
  const recentConnections = connections
    .slice(0, 3)
    .map((connection) => mapConnectionToFriendCard(connection, user?.uid));

  if (loading) {
    return (
      <div className="w-full rounded-2xl bg-white p-4 shadow-md">
        Carregando perfil...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full rounded-2xl bg-white p-4 shadow-md">
        {error || "Erro ao carregar perfil."}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="w-full rounded-2xl bg-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={`Avatar de ${displayName}`}
            className="h-16 w-16 rounded-2xl object-cover"
          />

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-black">
              {displayName}
            </h1>
            <p className="truncate text-sm text-gray-600">{courseLabel}</p>
            {showEmail ? (
              <p className="truncate text-sm text-gray-600">{email}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-3 text-center text-sm text-gray-600">
          <div>
            <p className="text-xl font-bold text-black">{totalPosts}</p>
            <p>Posts</p>
          </div>
          <div>
            <p className="text-xl font-bold text-black">{totalConnections}</p>
            <p>Conexoes</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Conexoes recentes
          </p>
          {connectionsLoading ? (
            <p className="text-sm text-gray-500">Carregando conexoes...</p>
          ) : null}
          {!connectionsLoading && !recentConnections.length ? (
            <p className="text-sm text-gray-500">
              Voce ainda nao possui conexoes recentes.
            </p>
          ) : null}
          {recentConnections.map((connection) => (
            <div key={connection.nome} className="flex items-center gap-3">
              <img
                src={connection.avatar}
                alt={connection.nome}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-black">
                  {connection.nome}
                </p>
                <p className="text-xs text-gray-500">{connection.curso}</p>
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
    <div className="w-full rounded-2xl bg-white p-4 shadow-md sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={`Avatar de ${displayName}`}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-black">
              {displayName}
            </h1>
            <p className="truncate text-sm text-gray-600">{courseLabel}</p>
            {showEmail ? (
              <p className="truncate text-sm text-gray-600">{email}</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3 text-sm text-gray-600">
          <p>Desde: {memberSince}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4 text-center shadow-sm sm:p-6">
          <div>
            <p className="text-2xl font-bold text-black">{totalPosts}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">{totalConnections}</p>
            <p className="text-sm text-gray-500">Conexoes</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Conexoes recentes
          </p>
          <div className="space-y-3">
            {connectionsLoading ? (
              <p className="text-sm text-gray-500">Carregando conexoes...</p>
            ) : null}
            {!connectionsLoading && !recentConnections.length ? (
              <p className="text-sm text-gray-500">
                Voce ainda nao possui conexoes recentes.
              </p>
            ) : null}
            {recentConnections.map((connection) => (
              <div key={connection.nome} className="flex items-center gap-3">
                <img
                  src={connection.avatar}
                  alt={connection.nome}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-black">
                    {connection.nome}
                  </p>
                  <p className="text-xs text-gray-500">{connection.curso}</p>
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
