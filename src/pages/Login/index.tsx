import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../contexts/useAuth";

const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "E-mail ou senha invalidos.",
  "auth/invalid-email": "Digite um e-mail valido.",
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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,#ece4dc_60%)] px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl bg-surface shadow-[0_24px_80px_rgba(122,106,99,0.18)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-[linear-gradient(160deg,#ef5d39,#ff8b6a)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              Uni4Life
            </p>
            <h1 className="mt-6 max-w-sm text-5xl font-bold leading-tight">
              Entre para acompanhar sua rede universitaria.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/85">
              Publique atualizacoes, acompanhe conexoes e mantenha seu perfil
              sempre acessivel em um unico lugar.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm text-white/80">Acesso recomendado</p>
            <p className="mt-2 text-2xl font-semibold">E-mail e senha</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Ative o provedor de autenticacao no Firebase Console antes de
              testar a tela.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Login
            </p>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900">
              Acesse sua conta
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use o mesmo e-mail e senha cadastrados no Firebase Authentication.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">
                  E-mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Sua senha"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
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
              Ainda nao tem conta?{" "}
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
    </main>
  );
}
