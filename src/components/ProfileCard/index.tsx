import { useAuth } from "../../contexts/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();

  const displayName = user?.displayName?.trim() || "Usuario";
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

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-md sm:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
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
            <p className="truncate text-sm text-gray-600">{email}</p>
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3 text-sm text-gray-600">
          <p>Desde: {memberSince}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6">
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Resumo</p>
          <p className="text-sm text-gray-700">
            Perfil autenticado pelo Firebase e pronto para receber mais dados do
            usuario quando o perfil for expandido.
          </p>
        </div>
      </div>
    </div>
  );
}
