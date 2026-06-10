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

export function getUser(userUid: string) {
  return apiRequest<UserRead>(`/users/${userUid}`);
}

export function createUser(payload: UserCreate) {
  return apiRequest<UserRead>("/users", {
    method: "POST",
    body: payload,
  });
}

export function updateUser(userUid: string, payload: UserUpdate) {
  return apiRequest<UserRead>(`/users/${userUid}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteUser(userUid: string) {
  return apiRequest<void>(`/users/${userUid}`, {
    method: "DELETE",
  });
}

export function createConnection(userUid: string, targetUid: string) {
  return apiRequest<ConnectionRead>(
    `/users/${userUid}/connections/${targetUid}`,
    {
      method: "POST",
    }
  );
}

export function listConnections(userUid: string) {
  return apiRequest<ConnectionRead[]>(`/users/${userUid}/connections`);
}

export function getUserSuggestions(userUid: string) {
  return apiRequest<UserRead[]>(`/users/${userUid}/suggestions`);
}
