import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import { useAuth } from "../../contexts/useAuth";
import { ApiError } from "../../services/api";
import { createPost } from "../../services/posts";

function getAvatarUrl(name: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`;
}

export default function Publish() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const authorName = user?.displayName?.trim() || "Seu perfil";
  const authorProfession = user?.email || "Sessao ativa";
  const authorAvatar = user?.photoURL || getAvatarUrl(authorName);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setErrorMessage("Escreva algo antes de publicar.");
      return;
    }

    if (!user?.uid) {
      setErrorMessage(
        "Nao foi possivel identificar um user_id numerico a partir da sua sessao.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await createPost({
        author_uid: user.uid,
        content: trimmedContent,
      });

      navigate("/feed", {
        replace: true,
        state: { publishSuccess: true },
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel publicar agora. Tente novamente.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-xl flex-col justify-center gap-6 pt-12"
      >
        <div className="flex flex-row justify-between">
          <ActionButton
            text="Voltar"
            icon={<FaArrowLeft />}
            color="transparent"
            url="/feed"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-2xl">
          <div className="mb-4 flex items-center gap-4">
            <img
              src={authorAvatar}
              alt={`Avatar de ${authorName}`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-black">{authorName}</h1>
              <p className="text-sm text-gray-600">{authorProfession}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="h-40 w-full resize-none rounded-lg border border-gray-200 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="O que voce quer compartilhar com a comunidade?"
              disabled={isSubmitting}
            />

            <div className="flex flex-row justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-2xl border border-primary bg-primary p-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                <IoPaperPlaneOutline />
                {isSubmitting ? "Publicando..." : "Publicar"}
              </button>
            </div>

            {errorMessage ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
