import type { FriendsCardProps, FriendsCardType } from "../components/FriendsCard";

function getDiceBearAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

export const mockConnections: FriendsCardProps[] = [
  {
    nome: "Joao",
    profissao: "Engenheiro",
    curiosidade: "Gosta de ler livros de ficcao cientifica",
    avatar: getDiceBearAvatar("Joao"),
    tipo: "conectar",
  },
  {
    nome: "Maria",
    profissao: "Designer",
    curiosidade: "Pratica yoga",
    avatar: getDiceBearAvatar("Maria"),
    tipo: "conectar",
  },
  {
    nome: "Lucas",
    profissao: "Desenvolvedor",
    curiosidade: "Coleciona jogos retro",
    avatar: getDiceBearAvatar("Lucas"),
    tipo: "conectar",
  },
  {
    nome: "Ana",
    profissao: "Psicologa",
    curiosidade: "Ama trilhas no fim de semana",
    avatar: getDiceBearAvatar("Ana"),
    tipo: "conectar",
  },
  {
    nome: "Rafael",
    profissao: "Professor",
    curiosidade: "Toca violao",
    avatar: getDiceBearAvatar("Rafael"),
    tipo: "conectar",
  },
  {
    nome: "Beatriz",
    profissao: "Arquiteta",
    curiosidade: "Adora fotografia urbana",
    avatar: getDiceBearAvatar("Beatriz"),
    tipo: "conectar",
  },
  {
    nome: "Carla",
    profissao: "Medica",
    curiosidade: "Cozinha receitas italianas",
    avatar: getDiceBearAvatar("Carla"),
    tipo: "amigos",
  },
  {
    nome: "Felipe",
    profissao: "Analista de Dados",
    curiosidade: "Corre maratonas",
    avatar: getDiceBearAvatar("Felipe"),
    tipo: "amigos",
  },
  {
    nome: "Juliana",
    profissao: "Jornalista",
    curiosidade: "Mantem um clube do livro",
    avatar: getDiceBearAvatar("Juliana"),
    tipo: "amigos",
  },
  {
    nome: "Thiago",
    profissao: "Fotografo",
    curiosidade: "Viaja de moto",
    avatar: getDiceBearAvatar("Thiago"),
    tipo: "amigos",
  },
  {
    nome: "Renata",
    profissao: "Advogada",
    curiosidade: "Faz aulas de teatro",
    avatar: getDiceBearAvatar("Renata"),
    tipo: "amigos",
  },
  {
    nome: "Bruno",
    profissao: "Empreendedor",
    curiosidade: "Cultiva plantas em casa",
    avatar: getDiceBearAvatar("Bruno"),
    tipo: "amigos",
  },
];

export function getConnectionsByType(tipo: FriendsCardType) {
  return mockConnections.filter((connection) => connection.tipo === tipo);
}
