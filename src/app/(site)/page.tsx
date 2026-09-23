import { BuiltForLogistics, DeepSpaceProgram, FinalCta, HowItWorks, IntelligenceMap, MissionBriefing, RouteIntelligence, SendPackageSection, WhatYspaceDoes } from "@/components"

export default function HomePage() {
  return (
    <>
      <MissionBriefing />
      <WhatYspaceDoes />
      <SendPackageSection />
      <RouteIntelligence />
      <IntelligenceMap />
      <HowItWorks />
      <BuiltForLogistics />
      <DeepSpaceProgram />
      <FinalCta />
    </>
  )
}
