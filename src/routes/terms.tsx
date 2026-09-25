import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/terms")({ component: Page });

function Page() {
  return (
    <InnerPage title="Terms of Service">
      <p>
        Delivery estimates are indicative. Payload is capped at 5 kg. Every
        booked flight is insured. Route Intelligence is provided as a decision
        aid, not a guarantee of road conditions.
      </p>
    </InnerPage>
  );
}
