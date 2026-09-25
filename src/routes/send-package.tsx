import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/home/nav";
import { Send } from "@/components/home/send";
import { Footer } from "@/components/home/footer";

export const Route = createFileRoute("/send-package")({ component: Page });

function Page() {
  return (
    <main className="bg-bg text-fg">
      <Nav />
      <div className="pt-10">
        <Send />
      </div>
      <Footer />
    </main>
  );
}
