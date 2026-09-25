import { getRequestUrl } from "@tanstack/react-start/server";

/**
 * Absolute URL of the request being rendered.
 *
 * The `.server` suffix is load-bearing: this is the only file in the OG path
 * that may reach `@tanstack/react-start/server`, and `origin.ts` references it
 * only from `createIsomorphicFn().server(...)` — Vite keeps that branch out of
 * the client bundle.
 */
export function serverRequestUrl(): URL {
  return getRequestUrl();
}
