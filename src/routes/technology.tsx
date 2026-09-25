import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/technology")({ component: Page });

function Page() {
  return (
    <InnerPage title="About ySpace">
      <p>
        ySpace is a drone delivery and logistics company based in Lagos,
        Nigeria. We fly autonomous last-mile routes and sell routing
        intelligence to the fleets already on the road.
      </p>
      <p>
        Our network is built for the density of Lagos: short hops, tight
        corridors, and a five-kilogram payload that covers most business and
        household parcels.
      </p>
    </InnerPage>
  );
}
