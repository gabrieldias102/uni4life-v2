export type UserRead = {
  id: number;
  name: string;
  profession: string;
  bio?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type UserCreate = {
  name: string;
  profession: string;
  bio?: string;
  email?: string;
  avatar_url?: string;
};

export type UserUpdate = Partial<UserCreate>;

export type ConnectionRead = {
  id?: number;
  user_id: string;
  target_id: number;
  created_at?: string;
  user?: UserRead;
  target?: UserRead;
};

export type PostRead = {
  id: number;
  user_id: string;
  content: string;
  image_url?: string | null;
  attachment_url?: string | null;
  created_at?: string;
  updated_at?: string;
  user?: UserRead;
  comments?: CommentRead[];
  reposts?: RepostRead[];
};

export type PostCreate = {
  user_id: string;
  content: string;
  image_url?: string;
  attachment_url?: string;
};

export type PostUpdate = Partial<Omit<PostCreate, "user_id">>;

export type CommentRead = {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  user?: UserRead;
};

export type CommentCreate = {
  user_id: string;
  content: string;
};

export type RepostRead = {
  id: number;
  post_id: number;
  user_id: string;
  content?: string | null;
  created_at?: string;
  user?: UserRead;
};

export type RepostCreate = {
  user_id: string;
  content?: string;
};

export type HealthRead = {
  status: string;
};
