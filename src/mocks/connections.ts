import type { FriendsCardProps, FriendsCardType } from "../components/FriendsCard";

function getDiceBearAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

export const mockConnections: FriendsCardProps[] = [
  {
    nome: "Joao",
    curso: "Engenharia",
    curiosidade: "Gosta de ler livros de ficcao cientifica",
    avatar: getDiceBearAvatar("Joao"),
    tipo: "conectar",
  },
  {
    nome: "Maria",
    curso: "Design",
    curiosidade: "Pratica yoga",
    avatar: getDiceBearAvatar("Maria"),
    tipo: "conectar",
  },
  {
    nome: "Lucas",
    curso: "Desenvolvimento de Software",
    curiosidade: "Coleciona jogos retro",
    avatar: getDiceBearAvatar("Lucas"),
    tipo: "conectar",
  },
  {
    nome: "Ana",
    curso: "Psicologia",
    curiosidade: "Ama trilhas no fim de semana",
    avatar: getDiceBearAvatar("Ana"),
    tipo: "conectar",
  },
  {
    nome: "Rafael",
    curso: "Matemática",
    curiosidade: "Toca violao",
    avatar: getDiceBearAvatar("Rafael"),
    tipo: "conectar",
  },
  {
    nome: "Beatriz",
    curso: "Arquitetura",
    curiosidade: "Adora fotografia urbana",
    avatar: getDiceBearAvatar("Beatriz"),
    tipo: "conectar",
  },
  {
    nome: "Carla",
    curso: "Medicina",
    curiosidade: "Cozinha receitas italianas",
    avatar: getDiceBearAvatar("Carla"),
    tipo: "amigos",
  },
  {
    nome: "Felipe",
    curso: "Análise de Dados",
    curiosidade: "Corre maratonas",
    avatar: getDiceBearAvatar("Felipe"),
    tipo: "amigos",
  },
  {
    nome: "Juliana",
    curso: "Jornalismo",
    curiosidade: "Mantem um clube do livro",
    avatar: getDiceBearAvatar("Juliana"),
    tipo: "amigos",
  },
  {
    nome: "Thiago",
    curso: "Fotografia",
    curiosidade: "Viaja de moto",
    avatar: getDiceBearAvatar("Thiago"),
    tipo: "amigos",
  },
  {
    nome: "Renata",
    curso: "Direito",
    curiosidade: "Faz aulas de teatro",
    avatar: getDiceBearAvatar("Renata"),
    tipo: "amigos",
  },
  {
    nome: "Bruno",
    curso: "Empreendedorismo",
    curiosidade: "Cultiva plantas em casa",
    avatar: getDiceBearAvatar("Bruno"),
    tipo: "amigos",
  },
];

export function getConnectionsByType(tipo: FriendsCardType) {
  return mockConnections.filter((connection) => connection.tipo === tipo);
}
