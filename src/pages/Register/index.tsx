import { useState } from "react";
import type { FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "Ja existe uma conta com este e-mail.",
  "auth/invalid-email": "Digite um e-mail valido.",
  "auth/missing-password": "Digite uma senha para continuar.",
  "auth/weak-password": "Sua senha precisa ter pelo menos 6 caracteres.",
};

export default function Register() {
  const { register, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(
          firebaseErrorMessages[err.code] ??
            "Nao foi possivel criar a conta agora.",
        );
      } else {
        setError("Nao foi possivel criar a conta agora.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,#ece4dc_60%)] px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl bg-surface shadow-[0_24px_80px_rgba(122,106,99,0.18)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Cadastro
            </p>
            <h1 className="mt-3 text-3xl font-bold text-zinc-900">
              Crie sua conta
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              Preencha seus dados para acessar a plataforma com Firebase
              Authentication.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">
                  Nome
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
                  required
                />
              </label>

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
                  placeholder="Minimo de 6 caracteres"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-soft"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">
                  Confirmar senha
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repita sua senha"
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
                {isSubmitting ? "Criando conta..." : "Criar conta"}
              </button>
            </form>

            <p className="mt-6 text-sm text-muted">
              Ja tem uma conta?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                to="/login"
              >
                Entrar
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden bg-[linear-gradient(160deg,#2e2622,#7a6a63)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
              Comunidade
            </p>
            <h2 className="mt-6 max-w-sm text-5xl font-bold leading-tight">
              Monte seu perfil e comece a se conectar.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80">
              Depois do cadastro, voce entra automaticamente e ja pode acessar
              feed, conexoes, publicacoes e perfil.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
            <p className="text-sm text-white/70">Importante</p>
            <p className="mt-2 text-2xl font-semibold">
              Ative o provedor de e-mail
            </p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              No Firebase Console, habilite Email/Password em Authentication
              para o cadastro funcionar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
