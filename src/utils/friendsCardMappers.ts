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
  connection: ConnectionRead,
  currentUserUid?: string
): FriendsCardProps {
  const relatedUser =
    currentUserUid && connection.connected_user.user_uid === currentUserUid
      ? connection.user
      : connection.connected_user;
  const displayName =
    relatedUser.full_name?.trim() ||
    relatedUser.username?.trim() ||
    "Usuario";

  return {
    nome: displayName,
    curso: relatedUser.course?.trim() || "Curso nao informado",
    curiosidade:
      relatedUser.bio?.trim() || "Voces ja fazem parte da mesma rede.",
    avatar: getAvatarUrl(displayName),
    tipo: "amigos",
    targetUid: relatedUser.user_uid,
  };
}
