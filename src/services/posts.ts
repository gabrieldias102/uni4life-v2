import { apiRequest } from "./api";
import type {
  CommentCreate,
  CommentRead,
  PostCreate,
  PostRead,
  PostUpdate,
  RepostCreate,
  RepostRead,
} from "./socialApi.types"; 

export function listPosts() {
  return apiRequest<PostRead[]>("/posts");
}

export function getPost(postId: number) {
  return apiRequest<PostRead>(`/posts/${postId}`);
}

export function createPost(payload: PostCreate) {
  return apiRequest<PostRead>("/posts", {
    method: "POST",
    body: payload,
  });
}

export function updatePost(postId: number, payload: PostUpdate) {
  return apiRequest<PostRead>(`/posts/${postId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deletePost(postId: number) {
  return apiRequest<void>(`/posts/${postId}`, {
    method: "DELETE",
  });
}


export function listUserPosts(userUid: string) {
  return apiRequest<PostRead[]>(`/users/${userUid}/posts`);
}


export function listPostComments(postId: number) {
  return apiRequest<CommentRead[]>(`/posts/${postId}/comments`);
}

export function createComment(postId: number, payload: CommentCreate) {
  return apiRequest<CommentRead>(`/posts/${postId}/comments`, {
    method: "POST",
    body: payload,
  });
}

export function listPostReposts(postId: number) {
  return apiRequest<RepostRead[]>(`/posts/${postId}/reposts`);
}

export function createRepost(postId: number, payload: RepostCreate) {
  return apiRequest<RepostRead>(`/posts/${postId}/reposts`, {
    method: "POST",
    body: payload,
  });
}