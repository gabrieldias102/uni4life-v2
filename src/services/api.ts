export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("A variavel VITE_API_BASE_URL nao foi configurada no arquivo .env.");
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`).toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const responseBody = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof responseBody === "object" &&
      responseBody !== null &&
      "detail" in responseBody &&
      typeof responseBody.detail === "string"
        ? responseBody.detail
        : response.statusText || "Erro ao se comunicar com a API.";

    throw new ApiError(message, response.status, responseBody);
  }

  return responseBody as T;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...requestInit } = options;
  const shouldSendJsonBody = body !== undefined;

  const response = await fetch(buildUrl(path), {
    ...requestInit,
    headers: {
      ...(shouldSendJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: shouldSendJsonBody ? JSON.stringify(body) : undefined,
  });

  return parseResponse<T>(response);
}

export function getHealth() {
  return apiRequest<{ status: string }>("/health");
}

export { API_BASE_URL };
