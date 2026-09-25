import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/career")({ component: Page });

function Page() {
  return (
    <InnerPage title="Careers">
      <p>
        We hire pilots, software engineers, mechanics and operators who want to
        put cargo in the air over Lagos. Open roles are listed as they open —
        write to careers@yspace.ng.
      </p>
    </InnerPage>
  );
}
