import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Products } from "@/components/home/products";
import { DropReel } from "@/components/home/drop-reel";
import { Send } from "@/components/home/send";
import { RouteIntel } from "@/components/home/route";
import { How } from "@/components/home/how";
import { Fleet } from "@/components/home/fleet";
import { Vision } from "@/components/home/vision";
import { FinalCta } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="bg-bg text-fg">
      <Nav />
      <Hero />
      <Products />
      <DropReel />
      <Send />
      <RouteIntel />
      <How />
      <Fleet />
      <Vision />
      <FinalCta />
      <Footer />
    </main>
  );
}
