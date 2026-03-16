import { IoCheckmark, IoPersonAddOutline } from "react-icons/io5";
import ActionButton from "../ActionButton";

export type FriendsCardType = "conectar" | "amigos";

export type FriendsCardProps = {
  nome: string;
  profissao: string;
  curiosidade: string;
  avatar: string;
  tipo: FriendsCardType;
};

export default function FriendsCard({
  nome,
  profissao,
  curiosidade,
  avatar,
  tipo,
}: FriendsCardProps) {
  const isConnected = tipo === "amigos";

  return (
    <div className="flex min-w-full items-center gap-4 rounded-lg bg-white p-4 shadow">
      <div className="flex w-1/12 justify-center">
        <img
          src={avatar}
          alt={`Foto de perfil de ${nome}`}
          className="h-14 w-14 rounded-full object-cover"
        />
      </div>
      <div className="w-8/12">
        <h1 className="text-lg font-bold text-black">{nome}</h1>
        <h1 className="text-sm text-gray-600">{profissao}</h1>
        <h1 className="text-sm text-gray-600">{curiosidade}</h1>
      </div>
      <div className="w-3/12">
        <ActionButton
          color={isConnected ? "white" : "primary"}
          icon={isConnected ? <IoCheckmark /> : <IoPersonAddOutline />}
          text={isConnected ? "Conectado" : "Conectar"}
        />
      </div>
    </div>
  );
}
