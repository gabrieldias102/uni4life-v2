import FriendsCard from "../../components/FriendsCard";
import { useAuth } from "../../contexts/useAuth";
import { useConnections } from "../../hooks/useConnections";
import {
  mapConnectionToFriendCard,
  mapSuggestionToFriendCard,
} from "../../utils/friendsCardMappers";

export default function Conections() {
  const { user } = useAuth();
  const {
    suggestions,
    connections,
    loading,
    error,
    connect,
    connectingUserUids,
  } = useConnections(user?.uid);
  const conectarList = suggestions.map(mapSuggestionToFriendCard);
  const amigosList = connections.map((connection) =>
    mapConnectionToFriendCard(connection, user?.uid)
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col justify-center gap-6 px-4 pb-6 pt-12 sm:px-6">
      <p className="text-3xl font-bold text-black">Conexoes</p>
      <div className="gap-5">
        <p className="pb-4 text-md font-bold uppercase text-gray-600">
          Sugestoes para voce
        </p>
        <div>
          <div className="flex flex-col gap-4 pb-12">
            {loading ? (
              <p className="text-sm text-gray-500">Carregando sugestoes...</p>
            ) : null}
            {!loading && !conectarList.length ? (
              <p className="text-sm text-gray-500">
                Nenhuma sugestao disponivel no momento.
              </p>
            ) : null}
            {conectarList.map((friend) => (
              <FriendsCard
                key={friend.targetUid}
                showCuriosidade={false}
                {...friend}
                onConnect={connect}
                isSubmitting={connectingUserUids.includes(friend.targetUid ?? "")}
              />
            ))}
          </div>

          <p className="pb-4 text-md font-bold uppercase text-gray-600">
            Suas conexoes
          </p>
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-sm text-gray-500">Carregando conexoes...</p>
            ) : null}
            {!loading && !amigosList.length ? (
              <p className="text-sm text-gray-500">
                Voce ainda nao possui conexoes.
              </p>
            ) : null}
            {amigosList.map((friend) => (
              <FriendsCard
                key={friend.targetUid}
                showCuriosidade={false}
                {...friend}
              />
            ))}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
