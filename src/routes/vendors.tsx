import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/home/nav";
import { RouteIntel } from "@/components/home/route";
import { Footer } from "@/components/home/footer";

export const Route = createFileRoute("/vendors")({ component: Page });

function Page() {
  return (
    <main className="bg-bg text-fg">
      <Nav />
      <div className="pt-10">
        <RouteIntel />
      </div>
      <Footer />
    </main>
  );
}
