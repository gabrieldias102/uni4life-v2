import type { ProfilePostView } from "../components/ProfilePostSwitcher";

function getDiceBearAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

export type MockProfilePost = {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  publishedAt: string;
  tags: string[];
  type: ProfilePostView;
  republishedFrom?: string;
};

export const mockProfilePosts: MockProfilePost[] = [
  {
    id: "published-1",
    authorName: "Gabriel Dias",
    authorRole: "Desenvolvedor Front-end",
    authorAvatar: getDiceBearAvatar("Gabriel Dias"),
    content:
      "Finalizei a primeira versao da tela de perfil e estou refinando os componentes para deixar a experiencia mais consistente.",
    publishedAt: "Ha 2 horas",
    tags: ["react", "frontend", "ui"],
    type: "published",
  },
  {
    id: "published-2",
    authorName: "Gabriel Dias",
    authorRole: "Desenvolvedor Front-end",
    authorAvatar: getDiceBearAvatar("Gabriel Dias"),
    content:
      "Documentei alguns padroes de componentes para o time conseguir evoluir a interface com mais previsibilidade.",
    publishedAt: "Ontem",
    tags: ["design-system", "componentes"],
    type: "published",
  },
  {
    id: "published-3",
    authorName: "Gabriel Dias",
    authorRole: "Desenvolvedor Front-end",
    authorAvatar: getDiceBearAvatar("Gabriel Dias"),
    content:
      "Comecei a estruturar os mocks da aplicacao para acelerar o desenvolvimento enquanto a API definitiva nao fica pronta.",
    publishedAt: "Ha 3 dias",
    tags: ["mock", "typescript", "arquitetura"],
    type: "published",
  },
  {
    id: "republished-1",
    authorName: "Gabriel Dias",
    authorRole: "Desenvolvedor Front-end",
    authorAvatar: getDiceBearAvatar("Gabriel Dias"),
    content:
      "Esse conteudo sobre boas praticas de componentizacao me ajudou bastante a organizar melhor a tela de perfil.",
    publishedAt: "Ha 1 dia",
    tags: ["boas-praticas", "react"],
    type: "republished",
    republishedFrom: "Marina Costa",
  },
  {
    id: "republished-2",
    authorName: "Gabriel Dias",
    authorRole: "Desenvolvedor Front-end",
    authorAvatar: getDiceBearAvatar("Gabriel Dias"),
    content:
      "Republicando porque esse material sobre estados de carregamento e listas vazias vale muito para interfaces reais.",
    publishedAt: "Ha 5 dias",
    tags: ["ux", "loading", "empty-state"],
    type: "republished",
    republishedFrom: "Rafael Mendes",
  },
];

export function getProfilePostsByType(type: ProfilePostView) {
  return mockProfilePosts.filter((post) => post.type === type);
}
