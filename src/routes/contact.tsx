import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  return (
    <InnerPage title="Contact">
      <p>Lagos, Nigeria</p>
      <p>hello@yspace.live</p>
      <p>Enterprise: enterprise@yspace.live</p>
    </InnerPage>
  );
}
