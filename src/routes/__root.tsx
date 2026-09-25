import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { CANONICAL_ORIGIN, requestUrl } from "@/lib/og/origin";
import appCss from "../styles.css?url";

const APP_NAME = "ySpace";
const TITLE = `${APP_NAME} — Drone delivery across Lagos`;
const DESCRIPTION =
  "ySpace delivers parcels across Lagos with autonomous drones — pickup to " +
  "doorstep in about 30 minutes, tracked and insured every flight. Book a " +
  "pickup, or plug the route API into your own logistics stack.";

const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: APP_NAME,
      url: `${CANONICAL_ORIGIN}/`,
      logo: `${CANONICAL_ORIGIN}/logo/favicon-512.png`,
      email: "hello@yspace.live",
      areaServed: "Lagos, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${CANONICAL_ORIGIN}/#website`,
      url: `${CANONICAL_ORIGIN}/`,
      name: APP_NAME,
      inLanguage: "en-NG",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Service",
      name: "Autonomous drone delivery",
      serviceType: ["Parcel delivery", "Route intelligence"],
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "City", name: "Lagos" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${CANONICAL_ORIGIN}/send-package`,
      },
    },
  ],
};

export const Route = createRootRoute({
  head: async () => {
    const request = await requestUrl();
    // Share assets resolve on the serving host so the card renders anywhere;
    // canonical stays pinned to the production domain for indexing.
    const image = new URL("/og.jpg", request.origin).toString();
    const canonical = new URL(request.pathname, CANONICAL_ORIGIN).toString();

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { name: "theme-color", content: "#0A0A0A" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: APP_NAME },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:alt", content: TITLE },
        { property: "og:locale", content: "en_NG" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: TITLE },
      ],
      links: [
        { rel: "canonical", href: canonical },
        { rel: "icon", type: "image/png", href: "/logo/favicon.png" },
        { rel: "apple-touch-icon", href: "/logo/apple-touch-icon.png" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
        },
      ],
    };
  },
  component: () => (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
