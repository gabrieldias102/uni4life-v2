import type { FriendsCardProps } from "../components/FriendsCard";
import type { ConnectionRead, UserRead } from "../services/socialApi.types";

function getAvatarUrl(name: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`;
}

export function mapSuggestionToFriendCard(user: UserRead): FriendsCardProps {
  const displayName = user.full_name?.trim() || user.username?.trim() || "Usuario";

  return {
    nome: displayName,
    curso: user.course?.trim() || "Curso nao informado",
    curiosidade:
      user.bio?.trim() || "Conecte-se para conhecer mais sobre essa pessoa.",
    avatar: getAvatarUrl(displayName),
    tipo: "conectar",
    targetUid: user.user_uid,
  };
}

export function mapConnectionToFriendCard(
  connection: ConnectionRead
): FriendsCardProps {
  const connectedUser = connection.connected_user;
  const displayName =
    connectedUser.full_name?.trim() ||
    connectedUser.username?.trim() ||
    "Usuario";

  return {
    nome: displayName,
    curso: connectedUser.course?.trim() || "Curso nao informado",
    curiosidade:
      connectedUser.bio?.trim() || "Voces ja fazem parte da mesma rede.",
    avatar: getAvatarUrl(displayName),
    tipo: "amigos",
    targetUid: connectedUser.user_uid,
  };
}
