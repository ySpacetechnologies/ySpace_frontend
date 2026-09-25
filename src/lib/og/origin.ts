/**
 * The site ships on whatever domain it is pointed at — yspace.live, a
 * *.vercel.app preview, or a future .com/.net. Social scrapers refuse a
 * relative `og:image`, so share assets have to be built from the origin the
 * request actually arrived on; anything absolute-and-hardcoded only renders
 * on the one host that owns it.
 */

import { createIsomorphicFn } from "@tanstack/react-start";

export const CANONICAL_ORIGIN = "https://yspace.live";

/**
 * URL of the document being rendered. Server reads the live request, client
 * reads `location` — both sides must agree, because `<HeadContent />` is
 * hydrated. The `.server()` half is the only place a `*.server` module may be
 * referenced from this file; Vite keeps that branch out of the client bundle.
 */
export const requestUrl = createIsomorphicFn()
  .client((): URL => new URL(window.location.href))
  .server((): Promise<URL> => import("./request-url.server").then((mod) => mod.serverRequestUrl()));
