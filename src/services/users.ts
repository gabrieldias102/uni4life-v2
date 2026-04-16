import { apiRequest } from "./api";
import type {
  ConnectionRead,
  UserCreate,
  UserRead,
  UserUpdate,
} from "./socialApi.types";

export function listUsers() {
  return apiRequest<UserRead[]>("/users");
}

export function getUser(userId: number) {
  return apiRequest<UserRead>(`/users/${userId}`);
}

export function createUser(payload: UserCreate) {
  return apiRequest<UserRead>("/users", {
    method: "POST",
    body: payload,
  });
}

export function updateUser(userId: number, payload: UserUpdate) {
  return apiRequest<UserRead>(`/users/${userId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteUser(userId: number) {
  return apiRequest<void>(`/users/${userId}`, {
    method: "DELETE",
  });
}

export function connectUsers(userId: number, targetId: number) {
  return apiRequest<ConnectionRead>(`/users/${userId}/connections/${targetId}`, {
    method: "POST",
  });
}

export function listConnections(userId: number) {
  return apiRequest<ConnectionRead[]>(`/users/${userId}/connections`);
}
