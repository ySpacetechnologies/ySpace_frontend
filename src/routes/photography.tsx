import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/photography")({ component: Page });

function Page() {
  return (
    <InnerPage title="Photography & Videography">
      <p>
        Aerial photography and videography using the same airframes that fly
        parcels. Book a shoot through hello@yspace.live.
      </p>
    </InnerPage>
  );
}
