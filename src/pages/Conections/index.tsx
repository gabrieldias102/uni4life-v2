import FriendsCard from "../../components/FriendsCard";
import { getConnectionsByType } from "../../mocks/connections";

export default function Conections() {
  const conectarList = getConnectionsByType("conectar").slice(0, 4);
  const amigosList = getConnectionsByType("amigos").slice(0, 4);

  return (
    <div className="mx-auto flex max-w-3xl flex-col justify-center gap-6 pt-12">
      <p className="text-3xl text-black font-bold">Conexões</p>
      <div className="gap-5">
        <p className="text-gray-600 uppercase font-bold text-md pb-4">
          Sugestões para você
        </p>
        <div>
          <div className="flex flex-col gap-4 pb-12">
            {conectarList.map((friend) => (
              <FriendsCard key={`${friend.tipo}-${friend.nome}`} {...friend} />
            ))}
          </div>
          <p className="text-gray-600 uppercase font-bold text-md pb-4">
            Sugestões para você
          </p>
          <div className="flex flex-col gap-4">
            {amigosList.map((friend) => (
              <FriendsCard key={`${friend.tipo}-${friend.nome}`} {...friend} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
