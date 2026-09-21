import { BannerMarquee, CategoriesSection, FaqsSection, FuturePlans, Hero, HowItWorks, TopNotchSection } from "@/components"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BannerMarquee />
      <TopNotchSection />
      <CategoriesSection />
      <HowItWorks />
      <FaqsSection />
      <FuturePlans />
    </>
  )
}
