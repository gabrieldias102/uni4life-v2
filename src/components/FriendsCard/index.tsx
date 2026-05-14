import { IoCheckmark, IoPersonAddOutline } from "react-icons/io5";
import ActionButton from "../ActionButton";

export type FriendsCardType = "conectar" | "amigos";

export type FriendsCardProps = {
  nome: string;
  curso: string;
  curiosidade: string;
  avatar: string;
  tipo: FriendsCardType;
  compact?: boolean;
};

export default function FriendsCard({
  nome,
  curso,
  curiosidade,
  avatar,
  tipo,
  compact = false,
}: FriendsCardProps) {
  const isConnected = tipo === "amigos";
  const containerClasses = compact
    ? "flex min-w-full items-center justify-between gap-3 rounded-3xl bg-slate-50 p-3 shadow-sm border border-gray-100"
    : "flex min-w-full items-center gap-4 rounded-lg bg-white p-4 shadow";
  const avatarClasses = compact
    ? "h-12 w-12 rounded-full object-cover"
    : "h-14 w-14 rounded-full object-cover";

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={avatar}
          alt={`Foto de perfil de ${nome}`}
          className={avatarClasses}
        />
        <div className="min-w-0">
          <h1 className={compact ? "text-sm font-semibold text-black truncate" : "text-lg font-bold text-black"}>
            {nome}
          </h1>
          <p className={compact ? "text-xs font-medium text-gray-600 truncate" : "text-sm text-gray-600"}>
            {curso}
          </p>
        </div>
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p className="text-sm text-gray-600">{curiosidade}</p>
        </div>
      ) : null}
      <div className={compact ? "flex-shrink-0" : "w-3/12"}>
        <ActionButton
          color={isConnected ? "white" : "primary"}
          icon={isConnected ? <IoCheckmark /> : <IoPersonAddOutline />}
          text={isConnected ? "Conectado" : "Conectar"}
        />
      </div>
    </div>
  );
}
