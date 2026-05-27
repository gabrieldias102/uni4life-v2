type PostRead = {
  id: string;
  author: {
    username: string;
    full_name: string;
  };
  created_at: string;
  content: string;
};

type ProfilePostListProps = {
  posts: PostRead[];
  loading?: boolean;
  error?: string | null;
};

export default function ProfilePostList({
  posts,
  loading = false,
  error = null,
}: ProfilePostListProps) {
  if (loading) {
    return (
      <div className="w-full mt-4 rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-black">Carregando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-4 rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  // A verificação de posts indefinidos ou não-array é uma boa prática de defesa
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full mt-4 rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-black">
          Nenhum post encontrado. Seja o primeiro a publicar!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 pb-12">
      {/* vvvvvv AQUI ESTÁ A MUDANÇA PRINCIPAL vvvvvv */}
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
        >
          <div className="mb-4 flex items-center gap-4">
            <img
              // Usando um avatar genérico, pois a API não envia a URL da imagem ainda
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${post.author.username}`}
              alt={`Foto de perfil de ${post.author.full_name}`}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black">
                {post.author.full_name}
              </h2>
              <p className="text-sm text-gray-600">@{post.author.username}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
              {/* Formatando a data que vem da API */}
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="mb-4 text-sm leading-6 text-gray-700">{post.content}</p>

          {/* 
            A seção de tags foi removida, pois os dados da API ainda não incluem tags.
            Isso evita o erro .map() de undefined.
            Poderemos adicionar de volta quando a funcionalidade de tags for implementada.
          */}
        </article>
      ))}
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
    </div>
  );
}