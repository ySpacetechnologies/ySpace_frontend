import { createFileRoute } from "@tanstack/react-router";
import { InnerPage } from "@/components/home/inner-page";

export const Route = createFileRoute("/drone-repairs")({ component: Page });

function Page() {
  return (
    <InnerPage title="Drone Repairs">
      <p>
        Airframe, propulsion and avionics service for commercial drones in
        Lagos. Drop-off at our workshop or request a field visit.
      </p>
    </InnerPage>
  );
}
