import { IoCheckmark, IoPersonAddOutline } from "react-icons/io5";
import ActionButton from "../ActionButton";

export type FriendsCardType = "conectar" | "amigos";

export type FriendsCardProps = {
  nome: string;
  curso: string;
  curiosidade: string;
  avatar: string;
  tipo: FriendsCardType;
  targetUid?: string;
  compact?: boolean;
  showCuriosidade?: boolean;
  onConnect?: (targetUid: string) => void | Promise<void>;
  isSubmitting?: boolean;
  disabled?: boolean;
};

export default function FriendsCard({
  nome,
  curso,
  curiosidade,
  avatar,
  tipo,
  targetUid,
  compact = false,
  showCuriosidade = true,
  onConnect,
  isSubmitting = false,
  disabled = false,
}: FriendsCardProps) {
  const isConnected = tipo === "amigos";
  const isActionDisabled =
    isConnected || disabled || isSubmitting || !onConnect || !targetUid;
  const shouldShowCuriosidade = !compact && showCuriosidade;
  const containerClasses = compact
    ? "flex min-w-full items-center justify-between gap-3 rounded-3xl bg-highlight p-1"
    : `flex min-w-full items-center rounded-lg bg-cards p-4 shadow ${
        shouldShowCuriosidade ? "gap-4" : "justify-between gap-6"
      }`;
  const avatarClasses = compact
    ? "bg-avatar border border-muted/20 h-12 w-12 rounded-full shrink-0 flex items-center justify-center"
    : "bg-avatar border border-muted/20 h-14 w-14 rounded-full shrink-0 flex items-center justify-center";
  const actionWrapperClasses = compact
    ? "shrink-0"
    : shouldShowCuriosidade
    ? "w-3/12"
    : "shrink-0";

  return (
    <div className={containerClasses}>
      <div className="flex min-w-0 items-center gap-3">
        <div className={avatarClasses}>
          <img
            src={avatar}
            alt={`Foto de perfil de ${nome}`}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="min-w-0">
          <h3
            className={
              compact
                ? "text-sm font-semibold text-text-primary truncate"
                : "truncate text-lg font-bold text-text-primary"
            }
          >
            {nome}
          </h3>
          <p
            className={
              compact
                ? "text-xs font-medium text-text-secondary truncate"
                : "truncate text-sm text-text-secondary"
            }
          >
            {curso}
          </p>
        </div>
      </div>
      {shouldShowCuriosidade ? (
        <div className="min-w-0 flex-1 border-l border-gray-100 pl-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Curiosidade
          </p>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {curiosidade}
          </p>
        </div>
      ) : null}
      <div className={actionWrapperClasses}>
        <ActionButton
          color={isConnected ? "white" : "primary"}
          icon={isConnected ? <IoCheckmark /> : <IoPersonAddOutline />}
          text={
            isConnected ? "Conectado" : isSubmitting ? "Conectando..." : "Conectar"
          }
          onClick={
            targetUid && onConnect ? () => onConnect(targetUid) : undefined
          }
          disabled={isActionDisabled}
        />
      </div>
    </div>
  );
}
