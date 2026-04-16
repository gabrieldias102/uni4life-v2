# Uni4Life v2

Frontend da Uni4Life construido com React, TypeScript e Vite. O projeto funciona como a base da interface da aplicacao, com autenticacao via Firebase e navegacao protegida entre as paginas principais.

## Visao geral

Hoje a aplicacao ja contempla:

- autenticacao de usuarios com Firebase Auth
- cadastro com atualizacao de nome de exibicao
- login e logout
- rotas protegidas para areas autenticadas
- paginas de feed, conexoes, publicacao e perfil
- interface estilizada com Tailwind CSS
- camada de servicos para consumo da API social

## Stack principal

- `React 19`
- `TypeScript`
- `Vite`
- `React Router DOM`
- `Firebase`
- `Tailwind CSS 4`
- `ESLint`

## Requisitos

Antes de rodar o projeto, tenha instalado:

- `Node.js` 20 ou superior
- `npm` 10 ou superior

## Como rodar localmente

1. Clone o repositorio:

```bash
git clone <url-do-repositorio>
cd uni4life-v2
```

2. Instale as dependencias:

```bash
npm install
```

3. Configure as variaveis de ambiente no arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

4. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador o endereco exibido pelo Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts disponiveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a build de producao
npm run preview  # sobe a build gerada localmente
npm run lint     # executa a analise estatica com ESLint
```

## Variaveis de ambiente

O projeto utiliza:

- `VITE_API_BASE_URL` para definir a URL base da API FastAPI consumida em `src/services/api.ts`
- credenciais do Firebase lidas a partir de `import.meta.env` em `src/services/firebase.ts`

Se for configurar um novo projeto Firebase, garanta que:

- o provedor de autenticacao por e-mail e senha esteja habilitado
- as chaves usadas no `.env` correspondam ao app web criado no console do Firebase

## Estrutura do projeto

```text
src/
  components/   # componentes reutilizaveis da interface
  contexts/     # contexto global de autenticacao
  hooks/        # hooks da aplicacao
  mocks/        # dados simulados usados na interface
  pages/        # paginas principais da aplicacao
  routes/       # protecao e composicao de rotas
  services/     # integracoes externas e cliente HTTP da API
```

## Servicos da API

As funcoes para consumo da API social ficam em `src/services`.

Arquivos principais:

- `src/services/api.ts`: cliente HTTP base com tratamento de erro
- `src/services/socialApi.types.ts`: tipos de payload e resposta
- `src/services/users.ts`: funcoes de usuarios e conexoes
- `src/services/posts.ts`: funcoes de posts, comentarios e reposts
- `src/services/index.ts`: barrel export para facilitar imports

Exemplo de uso:

```ts
import { createPost, listPosts, listUsers } from "./services";

const users = await listUsers();
const posts = await listPosts();
const newPost = await createPost({
  user_id: 1,
  content: "Meu primeiro post",
});
```

## Rotas atuais

Rotas publicas:

- `/login`
- `/register`

Rotas protegidas:

- `/feed`
- `/conections`
- `/publish`
- `/profile`

Ao acessar `/`, o usuario e redirecionado para `/feed`.

## Autenticacao

O estado de autenticacao e centralizado em `src/contexts/AuthContext.tsx`.

Esse contexto e responsavel por:

- observar mudancas de sessao com `onAuthStateChanged`
- autenticar usuarios com e-mail e senha
- registrar novas contas
- atualizar o `displayName` no cadastro
- encerrar a sessao do usuario

As rotas privadas utilizam `ProtectedRoute` para bloquear acesso quando nao existe usuario autenticado.
