import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  return (
    <InnerPage title="Contact">
      <p>Lagos, Nigeria</p>
      <p>hello@yspace.ng</p>
      <p>Enterprise: enterprise@yspace.ng</p>
    </InnerPage>
  );
}
