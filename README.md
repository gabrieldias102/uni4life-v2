# Uni4Life v2

Frontend da Uni4Life construído com React, TypeScript e Vite. O projeto funciona como a base da interface da aplicação, com autenticação via Firebase e navegação protegida entre as páginas principais.

## Visão geral

Hoje a aplicação já contempla:

- autenticação de usuários com Firebase Auth
- cadastro com atualização de nome de exibição
- login e logout
- rotas protegidas para áreas autenticadas
- páginas de feed, conexões, publicação e perfil
- interface estilizada com Tailwind CSS

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

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd uni4life-v2
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```env
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

5. Abra no navegador o endereço exibido pelo Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts disponíveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a build de produção
npm run preview  # sobe a build gerada localmente
npm run lint     # executa a análise estática com ESLint
```

## Variáveis de ambiente

O projeto utiliza o Firebase para autenticação. As credenciais são lidas a partir de `import.meta.env` no arquivo de configuração em `src/services/firebase.ts`.

Se for configurar um novo projeto Firebase, garanta que:

- o provedor de autenticação por e-mail e senha esteja habilitado
- as chaves usadas no `.env` correspondam ao app web criado no console do Firebase

## Estrutura do projeto

```text
src/
  components/   # componentes reutilizáveis da interface
  contexts/     # contexto global de autenticação
  mocks/        # dados simulados usados na interface
  pages/        # páginas principais da aplicação
  routes/       # proteção e composição de rotas
  services/     # integrações externas, como Firebase
```

## Rotas atuais

Rotas públicas:

- `/login`
- `/register`

Rotas protegidas:

- `/feed`
- `/conections`
- `/publish`
- `/profile`

Ao acessar `/`, o usuário é redirecionado para `/feed`.

## Autenticação

O estado de autenticação é centralizado em `src/contexts/AuthContext.tsx`.

Esse contexto é responsável por:

- observar mudanças de sessão com `onAuthStateChanged`
- autenticar usuários com e-mail e senha
- registrar novas contas
- atualizar o `displayName` no cadastro
- encerrar a sessão do usuário

As rotas privadas utilizam `ProtectedRoute` para bloquear acesso quando não existe usuário autenticado.
