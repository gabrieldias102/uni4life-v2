import type { PostRead } from "../../services/socialApi.types";

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

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full mt-4 rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-black">
          Nenhum post encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 pb-12">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
        >
          <div className="mb-4 flex items-center gap-4">
            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${post.author?.username}`}
              alt={`Foto de perfil de ${post.author?.full_name}`}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black">
                {post.author?.full_name}
              </h2>
              <p className="text-sm text-gray-600">@{post.author?.username}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          {post.repost_of ? (
            <p className="mb-3 text-sm font-medium text-primary">
              Republicado
            </p>
          ) : null}

          <p className="mb-4 text-sm leading-6 text-gray-700">{post.content}</p>
        </article>
      ))}
    </div>
  );
}