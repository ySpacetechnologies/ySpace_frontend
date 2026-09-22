import { CargoManifest, CommsLog, DeepSpaceProgram, FlightSequence, LaunchTicker, MissionBriefing, MissionsLog } from "@/components"

export default function HomePage() {
  return (
    <>
      <MissionBriefing />
      <LaunchTicker />
      <MissionsLog />
      <CargoManifest />
      <FlightSequence />
      <CommsLog />
      <DeepSpaceProgram />
    </>
  )
}
