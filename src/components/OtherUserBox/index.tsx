import { IoPersonAddOutline } from "react-icons/io5";

type OtherUserBoxProps = {
  nome: string;
  profissão: string;
  curiosidade: string;
};

export default function OtherUserBox({
  nome,
  profissão,
  curiosidade,
}: OtherUserBoxProps) {
  return (
    <div>
      <div className="w-1/12"></div>
      <div className="w-8/12">
        <h1 className="text-2xl text-black">{nome}</h1>
        <h1 className="text-xl text-gray-600">{profissão}</h1>
        <h1 className="text-xl text-gray-600">{curiosidade}</h1>
      </div>
      <div className="w-3/12">
        <button className="p-2 bg-primary text-white flex gap-2">
          <IoPersonAddOutline /> Conectar
        </button>
      </div>
    </div>
  );
}
