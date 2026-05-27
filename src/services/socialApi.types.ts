export type UserRead = {
  user_uid: string;
  full_name: string; 
  username: string;  
  bio?: string | null;
  joined_at: string;
  updated_at: string;
};


export type UserCreate = {
  user_uid: string;
  full_name: string;
  username: string;
};

export type UserUpdate = Partial<Omit<UserCreate, "user_uid">>;


export type PostRead = {
  id: number;
  content: string;
  author: UserRead; // 
  created_at: string;
  updated_at: string;
  repost_of: number | null; 
};


export type PostCreate = {
  author_uid: string;
  content: string;
};

export type PostUpdate = Partial<Omit<PostCreate, "author_uid">>;


export type CommentRead = {
  id: number;
  post_id: number;
  author: UserRead;
  content: string;
  created_at: string;
};

export type CommentCreate = {
  author_uid: string;
  content: string;
};

export type RepostRead = {
  id: number;
  post_id: number;
  user: UserRead; 
  created_at: string;
};

export type RepostCreate = {
  user_uid: string;
};


export type HealthRead = {
  status: string;
};