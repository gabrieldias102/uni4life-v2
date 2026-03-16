import { FaArrowLeft } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GoPaperclip, GoImage } from "react-icons/go";
import ActionButton from "../../components/ActionButton";

export default function Publish() {
  return (
    <div>
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-6 pt-12">
        <div className="flex justify-between flex-row">
          <ActionButton
            text="Voltar"
            icon={<FaArrowLeft />}
            color="transparent"
            url="/feed"
          />
          <ActionButton
            text="Publicar"
            icon={<IoPaperPlaneOutline />}
            color="primary"
          />
        </div>
        <div className="bg-white p-4 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=John Doe"
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-black">Nome</h1>
              <p className="text-sm text-gray-600">Profissão</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <textarea
              className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="O que você quer compartilhar com a comunidade?"
            />
            <div className="flex gap-8 px-4">
              <div className="flex items-center gap-2">
                <GoImage /> Imagem
              </div>
              <div className="flex items-center gap-2">
                <GoPaperclip /> Arquivo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
