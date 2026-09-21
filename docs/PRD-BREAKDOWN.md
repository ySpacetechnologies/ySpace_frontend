# ySpace PRD Breakdown — Master Reference

> Covers both PDFs in this folder:
> 1. **ySpace WebApp Logistics Platform PRD** (106 pp) — the *external, commercial* website/app
> 2. **ySpaceOS Mission Control PRD** (95 pp) — the *internal* control tower for website owners (ySpace itself)
>
> Both are part of one product family: **ySpaceOS** is the underlying "operating system" for autonomous logistics. Mission Control is the internal interface; the Logistics Platform is the external one. **They share infrastructure but must never be confused as one UX.**

---

## PART 0 — THE ONE-SENTENCE SUMMARY (memorize this)

> **"Yspace operates its own transportation infrastructure (drones), while giving other businesses the intelligence to operate theirs better (route intelligence)."** — PRD §155 calls this *the most important sentence in the entire document.*

The three golden rules from the Logistics PRD (§168–171):
- **Design rule:** Don't design the enterprise interface as "a better Google Maps" — design a *logistics intelligence workspace*. The map is not the product; the intelligence around it is.
- **Engineering rule:** Don't build a replacement fleet-management system — build an *intelligence layer that plugs into* existing fleet systems.
- **Business rule:** Don't sell "we manage your riders" — sell "we make the routes your riders take smarter."
- **ySpaceOS rule:** Mission Control = *Operate Yspace*. Logistics Platform = *Use Yspace*. Shared infrastructure, never shared UX.

---

## PART 1 — SYSTEM ARCHITECTURE (how everything connects)

```
                        ySpaceOS
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
  INTERNAL LAYER                       EXTERNAL LAYER
  MISSION CONTROL                   LOGISTICS PLATFORM (the website)
  (operate ySpace's own             ├─ Use Case A: DRONE DELIVERY → customers
   drone fleet: telemetry,          └─ Use Case B: ROUTE INTELLIGENCE → businesses
   missions, airspace…)                        │
                                               ▼
                                     Businesses' OWN fleets/systems
```

**Why this matters:** Mission Control is the *control tower* over ySpace's physical drone operations. The website never exposes raw telemetry, flight paths, aircraft health, or internal operational data to customers (Principle 5, §7). Information flows: drone → telemetry → Mission Control → a *customer-safe delivery status service* → the website.

---

## PART 2 — THE LOGISTICS PLATFORM (the user-facing website) 🔵

### 2.1 The two commercial use cases (must stay clearly separated)

| | Use Case A: Drone Delivery | Use Case B: Autonomous Route Intelligence |
|---|---|---|
| **Who** | Consumers / individuals | Logistics companies, e-commerce, marketplaces, retailers with their OWN fleets |
| **What** | Yspace physically delivers the package | Yspace sells routing intelligence (API-first) — Yspace never touches their vehicles |
| **Who operates transport?** | **Yspace** | **The enterprise** (Yspace only advises) |
| **Interface** | Friendly "Send a Package" flow (web + mobile app) | Enterprise workspace (desktop-first) + REST API + SDKs + webhooks |
| **Key entities** | Package, delivery, tracking | Organization, API keys, routing profiles, usage/billing |
| **Money** | Per-delivery price via Dynamic Pricing Engine | Subscription / usage-based / hybrid contract |

**The core enterprise flow (memorize the shape):**
`ENTERPRISE → routing request → YSPACE INTELLIGENCE → route result → enterprise's own logistics system → driver/rider app → vehicle`
The rider may never even know Yspace exists — "that is acceptable. In fact, it is desirable. Yspace becomes infrastructure" (§21).

### 2.2 What enterprises are actually buying (§5)
NOT rider/driver/vehicle/dispatch management. They buy: route calculation & optimization, alternatives, traffic-aware routing, ETA + ETA confidence, route comparison/scoring, vehicle-specific profiles, multi-stop routing, route history & analytics, API/SDK access, and eventually predictive + risk intelligence.

**Why this product exists (§6):** basic maps already do A→B. Mapbox Matrix API and Google Route Optimization API exist. So Yspace must NOT position as "we have a routing algorithm." The moat = logistics intelligence layer combining routing + enterprise data + local conditions + historical performance + explanations + integrations. Answering not "what route can this vehicle take?" but *"what is the best transportation decision given this road network, vehicle, business, time, destination and conditions?"*

### 2.3 Site information architecture (§10)
```
YSPACE
├── Home
├── Send a Package        ← consumer flow
├── Track Delivery
├── Drone Delivery
├── Enterprise
│   └── Autonomous Route Intelligence   ← business flow
├── API / Integrations
├── Pricing
├── Support
├── Future of Yspace      ← VISION ONLY, never bookable
│   ├── Global Logistics Network
│   ├── International High-Speed Transportation
│   ├── Rocket Transportation
│   ├── Global Yspace Infrastructure
│   └── Future Human Transportation
└── Account
```
**Critical content rule:** always separate "AVAILABLE TODAY" from "THE FUTURE." Rocket/human transportation is roadmap, presented as vision — never as a bookable service.

**Homepage (§11):** Primary message *"Move what matters, faster."* Two CTAs: **Send a Package** (consumers) + **For Businesses** (enterprise). Bottom of homepage: a visually distinct future-vision section ("The future of transportation is faster", China → intl hub → rocket transport → Nigeria → local hub → autonomous delivery → customer) with "Explore Our Vision →".

### 2.4 Consumer flow (§12)
`Website/App → Send a Package → Pickup → Destination → Package info (weight/dims/type/declared value/special handling) → Serviceability check → Estimate → Payment → Confirm → Yspace receives package → Yspace operates delivery → Customer tracks → Delivered`

Customer does NOT: operate the drone, select the aircraft, plan flight paths, control the drone, or see raw telemetry.

**Delivery status model (§77):** CREATED → CONFIRMED → PREPARING → PICKUP → READY → IN TRANSIT → APPROACHING → DELIVERED. Exceptions: DELAYED / CANCELLED / FAILED / REQUIRES ACTION.

**Tracking UX (§76):** simple — status, ETA, location, progress, destination. Not Mission Control complexity.

**Pricing (§74 + Payment Flow appendix):** backend **Dynamic Pricing Engine** (never hardcode in UI). Factors: weight, dimensions, distance, zones, category, urgency, drone availability, route complexity, weather, handling, base fee, service fees, taxes, promos, minimum charge. UI shows how the price was built without exposing internal logic.

**Marketplace channel (Payment Flow §2):** a marketplace integrates Yspace delivery via API into its own checkout — its customer may never know Yspace exists. Marketplace sends pickup/dropoff/weight/dims/category/order_value/priority → Yspace returns delivery_option, ETA, price, currency, quote_expiry → displayed as "Yspace Express Delivery — Today 4:30 PM — ₦X". Customer pays the *marketplace*, not Yspace; settlement happens B2B.

### 2.5 Enterprise model (§14–20)
- **Organization model** — a company is NOT a normal user account: e.g. Org `ABC Logistics Ltd.` / `ORG_00192`, owns subscription, members, API keys, routing profiles.
- **Roles:** Owner (full control) · Administrator · Operations Analyst · Developer (keys/webhooks/testing) · Billing Manager · Viewer (read-only).
- **Onboarding asks routing context, not fleet management:** "What are you trying to improve?" (faster routes / better ETA / multi-stop / traffic-aware / analytics / API) and "What vehicles?" (motorcycles/cars/vans/trucks) — to understand the routing problem, not to manage the fleet.
- **Integration-first (§19):** enterprise keeps its existing fleet/dispatch/driver software. Yspace only receives what it needs (origin, destination, stops, vehicle profile, departure, constraints) and returns (recommended route, distance, duration, ETA, alternatives, warnings, confidence).
- **Driver is an endpoint (§21, §158):** no Yspace account, subscription, or dashboard for drivers. The enterprise owns that relationship. Optional future: embedded **Driver SDK** (§22, §46).
- **Never build (§67–68):** rider management (payroll, HR, attendance, scheduling) or a generic fleet-management system.

### 2.6 The enterprise workspace (§35–43, §84)
Flagship screen = **Route Workspace**: left panel (route input: origin/destination/stops/vehicle/departure/objective/constraints) · center dominant map · right intelligence panel (recommendation, duration/distance/ETA, "Why?" explanation, risks) · bottom alternatives.

**Routing objectives (§27):** Fastest · Shortest · Reliable · Balanced · Avoid (tolls/highways/ferries/restricted roads). **Vehicle profiles (§28, §42):** routing characteristics (mode, dimensions, restrictions) — not fleet records. Ex: Motorcycle-Urban, Van-Urban, Truck-Regional.

**Explanation is a product requirement (§31):** "Recommended because it is expected to be 7 minutes faster under current traffic conditions" — never a black box. "Shortest does not always mean best" (§40): a recommended 41-min/18.2 km route can beat a 16.5 km alternative with reliability 72 vs 91.

**Levels of integration (§69):** L1 Dashboard (manual; testing/small biz/sales demos) → L2 API (production) → L3 SDK (embedded navigation for large platforms).

**API sketch (§44):** `POST /route` with origin/destination/stops/vehicle_profile/departure_time/constraints/objective → returns route_id, recommended_route, distance, duration, eta, geometry, alternatives, warnings, confidence. **Webhooks (§47):** route.created/updated, eta.updated, risk.detected. **Auth (§52):** production + test keys + webhook secret; revocable, rotatable, scoped, auditable. **Data ownership (§53):** customer operational data vs Yspace-generated intelligence vs platform data — to be finalized with legal.

### 2.7 Intelligence engines + roadmap (§107–120)
Separate engines, not one giant "AI": Geospatial · Routing · Traffic · ETA · Route Scoring · Route Reliability · Risk · Anomaly Detection · Prediction · Recommendation (the user-facing layer that turns math into "Route B recommended. Expected to save ~8 minutes. Current traffic is the primary reason.").

**No V1/V2 split** (§116) — one platform, three capability tiers:
- **Foundation:** accounts, booking, tracking, organizations, workspace, route calc + alternatives + ETA, profiles, API, map, integration infra.
- **Advanced:** multi-stop optimization, comparison, scoring, enterprise preferences, history, SDK, dynamic recalculation.
- **Future Intelligence:** predictive ETA, risk engine, predictive tagging, anomaly detection, learned local routing, proactive recommendations.

Map strategy (§55–56, §132): provider-agnostic abstraction (Mapbox/Google/HERE) for foundational maps/traffic; build proprietary value in local logistics knowledge, ETA intelligence, reliability, enterprise-specific learning, risk, explanations. Learning loop (§58): prediction → actual → error → model improvement.

### 2.8 Design priorities (§121, §167)
- **P1 (consumer):** Home, Send Package, Booking, Estimate, Checkout, Tracking
- **P2 (enterprise):** Enterprise landing, onboarding, dashboard, Route Intelligence workspace, results, comparison
- **P3 (infra):** Profiles, API, Webhooks, Integrations, Analytics, Usage, Team, Billing
Plus: design system, map design language (§123), empty/error states with clear language ("We couldn't calculate this route right now…"), graceful degradation + fallback routing (§131), observability separate from customer UI (§129).

**Enterprise landing (§151):** "Make every route smarter." CTA **Talk to Yspace** / Request Access (§98: sales-led, not forced self-serve pricing). Pilot mode (§100) + route benchmarking (§101: "your current route 52 min vs Yspace 43 min" — only with a defensible baseline). Positioning (§102): *"Yspace does not replace our logistics system — it makes our existing logistics system smarter."*

---

## PART 3 — MISSION CONTROL (the website-owners' control system) 🟡

### 3.1 What it is
The **Autonomous Logistics Control Tower** — the human-facing interface of ySpaceOS for operating ySpace's OWN drone fleet. Users: ySpace Operations, Mission Operators, Fleet/Logistics Managers, Autonomy Engineers, Maintenance, Admins. **Not** a customer product; nothing here is exposed to customers.

**The 5 questions it must answer at a glance (§4):** What is happening? Where? Why? What will happen next? What should we do?

**Design principles (§5–6):** situational awareness over data display · map-first · information hierarchy · progressive disclosure · human-in-the-loop · automation transparency (what happened → why → recommended action → confidence → consequence) · exception-first (normal ops fade into background; exceptions demand attention).

### 3.2 17 modules (§9)
01 Command Center · 02 Live Operations · 03 Fleet · 04 Missions · 05 Deliveries · 06 Route Intelligence · 07 Spatial Intelligence · 08 AI Detection · 09 Airspace · 10 Telemetry · 11 Bases & Charging · 12 Alerts & Incidents · 13 Analytics · 14 Mission History · 15 AI Assistant · 16 Administration · 17 System Settings.

### 3.3 Command Center (§12, §75)
Header (logo, status, time, connectivity, operator, notifications) · left nav (the 17 modules) · **center: large interactive 2D/3D map** · right contextual panel (drone/mission/alert) · bottom activity stream / mission timeline.
**Desktop-first** (§73): control-room targets — 1440p/4K/multi-monitor (map | fleet+telemetry | deliveries+missions | alerts). Dark control-room theme (§78). Color semantics (§79): green normal, yellow attention, orange warning, red critical, blue info/selected, grey inactive — never color alone.

**The map (§13–14):** satellite imagery as default primary view; layers toggleable (drones, routes, deliveries, bases, charging, weather, wind, airspace, geofences, buildings, terrain, AI objects, corridors). **Separate proprietary 3D layer** — Yspace builds its own high-detail 3D environments city-by-city from its own camera/spatial data ("Satellite Map → Select Location → Enter 3D View"). Long-term strategic asset: a proprietary 3D logistics map.

### 3.4 Core operational concepts
- **Drone states (§15):** flying, idle, charging, preparing, mission complete, returning, warning, emergency, offline. Drone detail page = full digital profile (identity, current state, mission, health, history).
- **Mission = the fundamental operational unit (§17):** ID, type, payload, origin/destination, priority, assigned drone, route, times, status (Draft → Planned → Awaiting Approval → Approved → Preparing → Active → Paused → Rerouting → Returning → Completed/Failed/Cancelled), operator, **autonomy level**, exceptions, telemetry, outcome.
- **Autonomous mission planning (§19):** system proposes the plan (route, duration, energy, risk, alternatives) from origin/destination/drone/battery/payload/airspace/geofences/terrain/weather/wind/priority; operator approves or modifies. Mission approval UX (§88) is "one of the most polished workflows in the product" (battery at launch/arrival, weather, risk, autonomy state + [MODIFY][APPROVE & LAUNCH]).
- **Autonomous Route Intelligence for drones (§20):** inputs = static (buildings, towers, restricted zones, corridors, landing zones) + dynamic (weather, wind, temporary restrictions, detected obstacles, other aircraft) + vehicle (battery, payload, range, health). **Dynamic path planning (§21):** "Route updated because wind conditions increased risk along Corridor A."
- **Digital Air Corridors (§22, §62):** V1 defines/visualizes corridors (boundaries, altitude ranges, direction, vehicle classes, risk); V2 continuously optimizes them from operational data (which are faster, windier, more reliable).
- **Obstacle avoidance split (§23):** Mission Control *plans and supervises*; **onboard autonomy** does real-time, millisecond-level collision avoidance. The cloud dashboard must NOT assume it can do that. Failsafe rule (§107): if Mission Control disappears, drones still follow onboard safety logic — it's never a single point of failure.
- **Spatial Intelligence (§24):** maps + satellite + 3D terrain + buildings + sensors + drone imagery + LiDAR + GPS + weather + detections → "turn geographic data into operational understanding."
- **AI Detection & Tracking (§25–27):** ingest perception data; object classes (person, vehicle, drone, aircraft, bird, obstacle…); maintain *tracks* (same object over time) with ID/class/location/velocity/confidence.
- **Telemetry (§28–29):** flight (GPS/altitude/speed/heading), energy (battery/voltage/estimated remaining), vehicle (motor/temp/vibration), comms (signal/latency/link), mission (waypoint/progress/ETA). Four disclosure levels so managers don't drown in engineering data. **Data freshness (§109):** "Updated 2 seconds ago" / stale warnings — vital in a control tower.
- **Deliveries (§30–31):** delivery board (ID, asset, status, ETA) with filters — the logistics layer.
- **Airspace & geofences (§32–33):** hard geofence (never enter), soft (conditional), operational zone, restricted zone, emergency zone. Weather (§34) influences route recommendations.
- **Bases & charging (§35–36):** V1 = visibility (who's charging, levels, completion, availability); autonomous charging decisions = V2.
- **Alerts & incidents (§37–38):** Information → Attention → Warning → Critical. Incidents are objects (type, asset, severity, automated response, operator, timeline). Activity feed + per-mission timeline (§39–40) + **mission replay** (§41) for review/investigation.

### 3.5 Roles & permissions (§42–43)
9 roles: Super Administrator · Operations Director · Mission Operator · Fleet Manager · Logistics Manager · Maintenance Manager · Autonomy Engineer · Analyst · Viewer — with a granular permission matrix (e.g., only admin manages users; engineers do firmware).

### 3.6 Autonomy levels (§44–45) — a signature ySpaceOS concept
- L0 Manual · L1 Assisted · L2 Supervised Autonomy · L3 Conditional Autonomy · L4 High Autonomy · L5 Network Autonomy
- **V1 operates at L1–2; V2 moves toward L2–4.** The UI always shows the current autonomy state (Route: Autonomous / Mission Approval: Human / Emergency Override: Human) and a permanent **human override** (pause/hold/return/reroute/abort/land/emergency).
- The long-term loop (§142): **OBSERVE → UNDERSTAND → PREDICT → PLAN → DECIDE → ACT → VERIFY** — V1 runs it with heavy human supervision; V2 closes it progressively.

### 3.7 V1 vs V2 (§91–94) — Mission Control DOES use a V1/V2 split
- **V1 = "help humans operate an intelligent fleet":** command & control, fleet monitoring, mission management + autonomous mission planning, dynamic path planning, route intelligence, corridors, obstacle-awareness integration, telemetry, spatial intelligence, AI detection/tracking, delivery ops, airspace/geofences, alerts/incidents, bases/charging visibility, history, analytics.
- **V2 = "the system operates the fleet intelligently with humans supervising":** predictive fleet health (predictive maintenance), **autonomous charging intelligence** (which drone charges first given queue/priority/demand), **logistics risk engine** ("Mission 10492 has a 72% probability of delay within 8 minutes → recommended: reroute via Corridor B"), predictive mission intelligence (pre-launch completion/on-time probabilities), predictive tagging ("high-risk corridor", "reliable landing zone"), anomaly detection, multi-drone coordination (conflict detection), autonomous mission recovery, dynamic fleet allocation, advanced corridors, network optimization, autonomous decision engine.
- **V3 vision (§129):** network-level autonomy — "What should the entire ySpace network do?"
- **V1 explicitly must NOT build (§92):** full autonomy, predictive maintenance, autonomous charging, advanced risk prediction, etc. *"Build the architecture for the future, but build the product for the present"* (§149).

### 3.8 Engineering & UX requirements
- **Data flow (§67):** drone sensors → edge layer → comms → data platform → intelligence engines → Mission Control → operator. **Edge vs cloud split (§68):** onboard = perception/avoidance/stabilization/safety; ySpaceOS = planning/coordination/route & spatial intelligence/prediction; Mission Control = human interaction/commands/monitoring.
- **Real-time, event-driven (§70–71):** DRONE_POSITION_UPDATED, MISSION_STARTED, ROUTE_CHANGED, OBSTACLE_DETECTED, DRONE_OFFLINE… — no page refreshes.
- **Cognitive-load design (§85):** "38 telemetry updates — all nominal" instead of 38 events; "12 route changes — 11 routine, 1 requires attention."
- **Context, action, traceability (§102–105):** never raw numbers ("Battery 38% → range 9.2 km, mission needs 6.1 km → Sufficient"); every insight links to actions; every change logs who/what/when/why/from/to + audit trail.
- **Trust rules (§90, §140):** never "AI decided" — always "Recommended because…". AI outputs carry confidence but confidence ≠ safety validation.
- **Scale (§111–112):** design for 5 → 1,000+ drones; clustering ("500 → cluster → 120 → zoom → individual"), filtering, aggregation, exception-first.
- **Screens (§72):** 32+ across Core/Intelligence/Logistics/Operations/Analytics/Admin; 25 required flows (§134); design for error/offline/degraded states (§137), not just happy path. Command palette (⌘K) + global search (§81–82).
- **Phasing (§125–128):** 1A Foundation → 1B Operations → 1C Intelligence → 1D Maturity → 2A Predictive → 2B Autonomous ops → 2C Network intelligence.
- **North Star (§124):** % of missions completed safely, successfully, efficiently with minimal human intervention.
- **Flywheels (§97–99):** missions → data → better models → better routes/predictions → better ops → more data. Spatial flywheel: world → observation → detection → tracks → spatial knowledge → route improvement.

### 3.9 Positioning
Not "drone tracking software" — *"This is where ySpace operates its autonomous transportation network"* (§3). V1 alone is investor-interesting (§143) because it already demonstrates 3D operational understanding, autonomous route generation, dynamic adjustments, airspace awareness, perception, and supervised autonomy. Vision (§148): *"An operating system for autonomous logistics"* — drones are the machines, the network is the infrastructure, data is the nervous system, AI engines are the intelligence, Mission Control is the control tower.

---

## PART 4 — THE TWO PDFs SIDE BY SIDE (great for Q&A)

| Dimension | Logistics Platform (external website) | Mission Control (internal control tower) |
|---|---|---|
| **Audience** | Customers + enterprises | ySpace's own operators |
| **Purpose** | Sell delivery + sell intelligence | Operate ySpace's drone network |
| **Telemetry/flight data** | Hidden; only customer-safe status | The core of the product |
| **Drones** | Invisible (Yspace handles everything) | Directly commanded & monitored |
| **Autonomy model** | No V1/V2 — Foundation → Advanced → Future Intelligence tiers | Explicit V1/V2/V3 + L0–L5 autonomy levels |
| **Map** | Simple customer tracking / rich enterprise route map | Satellite-first operational map + proprietary 3D layer, 15+ toggleable layers |
| **Money** | Dynamic pricing, marketplace settlement, enterprise contracts | N/A (internal tool) |
| **Human role** | Customer books & tracks; enterprise integrates | Operator supervises, approves, overrides |
| **Key UX idea** | "Send a Package" / "Make every route smarter" | Situational awareness, exception-first, 5 questions |
| **Connection** | Receives *controlled* delivery status from Mission Control | Feeds status up; never exposes raw ops data |

**Shared concepts across both:** route intelligence (ground routes for enterprises; air routes for drones), alternatives + explanations, ETA + confidence, corridors (digital air corridors ↔ road routing), risk engines, telemetry, predictive tagging, the data flywheel, and "explain, don't black-box."

---

## PART 5 — QUIZ-READY FACTS & FIGURES

1. Mission Control = the **internal** logistics control tower; Logistics Platform = the **external** commercial platform; both sit on **ySpaceOS**.
2. Customers never see telemetry, flight paths, aircraft health, or internal ops data. Customer ↔ drone connection is always mediated through Mission Control.
3. The enterprise never abandons its existing fleet software; Yspace plugs into it. Rider may never know Yspace exists — desirable ("Yspace becomes infrastructure").
4. Data model (§48) has **no** Yspace Driver / Rider / Vehicle entities — those are enterprise-owned; vehicle/driver IDs are just routing parameters.
5. Logistics PRD has 172 sections; the "most important sentence" (§155): Yspace operates its own transportation infrastructure while giving other businesses the intelligence to operate theirs better.
6. Homepage headline: **"Move what matters, faster."** Enterprise landing: **"Make every route smarter."**
7. Future vision section = roadmap only: global hubs, international high-speed/rocket transportation, eventually human transportation — never presented as bookable today.
8. Delivery states: CREATED → CONFIRMED → PREPARING → PICKUP → READY → IN TRANSIT → APPROACHING → DELIVERED (+ DELAYED/CANCELLED/FAILED/REQUIRES ACTION).
9. Mission states: Draft → Planned → Awaiting Approval → Approved → Preparing → Active → Paused → Rerouting → Returning → Completed/Failed/Cancelled.
10. Autonomy levels L0–L5; V1 = L1–2; V2 = L2–4; the loop is Observe→Understand→Predict→Plan→Decide→Act→Verify.
11. Alert severity: Information → Attention → Warning → Critical. Color semantics: green/yellow/orange/red/blue/grey — never color alone.
12. Three integration levels: Dashboard → API → SDK. Three billing models: subscription, usage-based, hybrid enterprise contract.
13. Route scoring example (§63): Travel Time 40% / Reliability 25% / Traffic 15% / Distance 10% / Constraints 10% (illustrative weights, enterprise-customizable).
14. Onboard autonomy handles real-time collision avoidance; Mission Control plans and supervises — never confuse the two.
15. Mission Control is desktop/control-room-first (1440p/4K/multi-monitor, dark theme); the consumer app is mobile-first; enterprise workspace is web/desktop-first with API as the primary production integration.
16. Every enterprise role vs Mission Control role set: enterprise = Owner/Admin/Analyst/Developer/Billing/Viewer; Mission Control = 9 roles incl. Autonomy Engineer & Maintenance Manager.
17. "Do not design a better Google Maps — design a logistics intelligence workspace." / "Do not build a fleet-management system — build the intelligence layer."
18. Notification rule (both PRDs): each notification must answer what happened, why it matters, what to do.
19. Mission Control north star: % of missions completed safely, successfully, efficiently with minimal human intervention.
20. Both PRDs warn against fake intelligence: route scores only after validation (§32); risk engine only with sufficient data (§113); benchmark improvements only with a defensible baseline (§101).
