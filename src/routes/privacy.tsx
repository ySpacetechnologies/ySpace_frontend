import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/privacy")({ component: Page });

function Page() {
  return (
    <InnerPage title="Privacy Policy">
      <p>
        ySpace Limited collects only what is needed to fly a delivery or run a
        routing job: pickup, drop-off, package details and contact information.
        We do not sell personal data.
      </p>
    </InnerPage>
  );
}
