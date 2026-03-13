import type { AxiosInstance } from 'axios';

let httpClient: AxiosInstance | null = null;

export function configureHttpClient(client: AxiosInstance): void {
  httpClient = client;
}

export function getHttpClient(): AxiosInstance {
  if (httpClient == null) {
    throw new Error(
      'HTTP client is not configured. Ensure configureHttpClient is called during app initialization.',
    );
  }
  return httpClient;
}
