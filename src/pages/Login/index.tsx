import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../contexts/useAuth";
import { ThemeToggle } from "../../components/ThemeTogle";

const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "E-mail ou senha inválidos.",
  "auth/invalid-email": "Digite um e-mail válido.",
  "auth/missing-password": "Digite sua senha para continuar.",
  "auth/too-many-requests":
    "Muitas tentativas. Tente novamente em alguns minutos.",
  "auth/user-disabled": "Esta conta foi desativada.",
};

export default function Login() {
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn(email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(
          firebaseErrorMessages[err.code] ?? "Nao foi possivel entrar agora.",
        );
      } else {
        setError("Nao foi possivel entrar agora.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl bg-surface shadow-[0_24px_80px_rgba(122,106,99,0.18)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-[linear-gradient(160deg,#ef5d39,#ff8b6a)] p-12 text-white lg:flex lg:flex-col lg:gap-2 lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              Uni4Life
            </p>
            <h1 className="max-w-sm text-5xl font-bold leading-tight">
              Entre para acompanhar sua rede universitária.
            </h1>
            <p className="my-4 max-w-md text-base leading-7 text-white/85">
              Publique atualizacões, acompanhe suas conexões e mantenha seu perfil
              sempre acessível em um único lugar.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm flex flex-col gap-2">
            <p className="text-sm text-white/80 font-bold">Comunidade acadêmica</p>
            <p className="text-2xl font-semibold">Exclusivo para alunos</p>
            <p className="text-sm leading-6 text-white/80">
              Conecte-se com colegas, participe de grupos de estudo e fique por dentro 
              de tudo o que acontece no seu campus.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Login
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text-primary">
              Acesse sua conta
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Insira o e-mail e a senha que você cadastrou na plataforma.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-text-primary">
                  E-mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-2xl border border-zinc-200 bg-cards px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-text-primary">
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Sua senha"
                  className="w-full rounded-2xl border border-zinc-200 bg-cards  px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
                  required
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="mt-6 text-sm text-muted">
              Ainda não tem conta?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                to="/register"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </section>
      </div>
      <footer className="fixed bottom-5 right-5 z-50 ">
        <ThemeToggle onlySwitch={true} />
      </footer>
    </main>
  );
}
