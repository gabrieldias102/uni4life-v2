import type { MockProfilePost } from "../../mocks/profilePosts";

type ProfilePostListProps = {
  posts: MockProfilePost[];
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
      <div className="mx-auto mt-6 w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-black">Carregando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-6 w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto mt-6 w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-black">
          Nenhum post encontrado para esta visualizacao.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col gap-4 pb-12">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex items-center gap-4">
            <img
              src={post.authorAvatar}
              alt={`Foto de perfil de ${post.authorName}`}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black">{post.authorName}</h2>
              <p className="text-sm text-gray-600">{post.authorRole}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
              {post.publishedAt}
            </span>
          </div>

          {post.republishedFrom ? (
            <p className="mb-3 text-sm font-medium text-primary">
              Republicado de {post.republishedFrom}
            </p>
          ) : null}

          <p className="mb-4 text-sm leading-6 text-gray-700">{post.content}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={`${post.id}-${tag}`}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
