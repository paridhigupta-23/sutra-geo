# SUTRA-GEO

SUTRA-GEO is a heritage-first prototype for turning everyday movement across India into discovery of living heritage, local stories, artisans and place-based cultural experiences.

## Indian tourism source policy

The grounded source layer uses Indian tourism departments, Government of India tourism pages, and official venue/business websites where available. No international source is required for the prototype UI.

## Core loop

Discover → Enter Heritage Zone → Geofence → Unlock Node → Heritage Micro-Quest → Earn Sutra Coins → Ask Sutra → Save to Passport → Capture Photo/Video → Community/Artisan Experience → Impact

## Implemented in this prototype

- India-first Heritage Map with 144 heritage + district discovery nodes across 28 states and 112 featured districts
- State → city/district → heritage node map controls
- 50m geofence proof with current distance, radius, unlock status and location accuracy
- Browser geolocation with accuracy and impossible-speed checks
- Visible demo geofence unlock for screening/demo use
- Functional 30-second Heritage Micro-Quest with node-specific question, completion, coins and Passport journey event
- Repeat-quest prevention per account and node
- Curated node dataset with coordinates, category, story, image, source, verification label, quest and artisan context
- Location-aware Ask Sutra grounded in the selected/current node dataset with source links
- Optional server-side LLM connector scaffold; browser prototype does not ship an API key
- Explicit AI scope: grounded heritage Q&A is implemented; transcription, richer recommendations and advanced camera AR remain future scope
- Profile with photo, username, journey statistics and settings
- Photo/video uploads using IndexedDB, with city + heritage-node metadata and captions
- City-based Heritage Passport with clickable cities, places, quests, photos, videos, coins and timeline
- Media grouped by heritage location inside each city
- Scrapbook connected to saved places and uploaded media, with All / Photos / Videos / Stories / Saved Places filters
- Living Heritage categories and artisan profiles
- Traveller → artisan experience flow with +40 prototype reward
- Stays and artisan experience inquiry capture with a local My Bookings view
- Community story submission and moderation states: Submitted → Under Review → Verified → Published
- Visible community moderation guidelines
- Prototype discovery leaderboard with honest fixed-demo labelling
- Sutra Coin history and functional prototype voucher redemption
- Local impact dashboard with explicit Prototype Simulation labelling
- Trip Planner that generates a working route using heritage nodes, food context and micro-quests
- Privacy controls for location, media deletion and account deletion
- Accessibility controls: larger text, high contrast and browser text-to-speech
- Language selection demo: English, Hindi and Telugu
- International visitor guidance for etiquette, photography, language and local travel
- Dynamic city-specific low-connectivity Heritage Pack using browser cache/service worker
- Visible dataset-load fallback on data-dependent pages
- Node-runnable unit tests for geofence math, dataset integrity and badge thresholds
- Backend/PostGIS scaffold documenting the production path without claiming that it is deployed

## Prototype vs production

This repository is a browser prototype. Account, wallet, journey, scrapbook and community data are stored locally in the browser. Media files use IndexedDB. Location is used for the visible geofence flow.

The production architecture should move critical flows to authenticated backend services with a geospatial database, object storage, moderation roles, rate limits, audit logs, consent records and server-side quest verification.

The repository includes a non-deployed FastAPI/PostGIS starting scaffold under `backend/` and `database/`. It is intentionally not presented as a live backend in the SIH demo.

### Production architecture proposal

User → Auth/API → Heritage Service → PostGIS/geospatial index → Geofence/Event Service → Quest Service → Wallet/Rewards → Media Storage → Community Moderation → Impact Analytics

Ask Sutra → Retrieval from verified heritage dataset → server-side LLM → answer + source attribution

## AI scope

### Implemented now
- Selected/current heritage-node context
- Curated source-backed local answers
- Source links shown to the traveller
- Honest local grounded mode when no backend is configured

### Optional production connector

`config.example.js` documents the endpoint shape for a server-side Ask Sutra service. A real deployment should keep LLM credentials server-side and retrieve the relevant heritage context before generating an answer.

## Privacy model in the prototype

- Location access can be switched off from Profile.
- Location is not continuously stored as a raw track in this browser prototype; journey events store city/state/node context needed for the experience.
- Uploaded media can be deleted from the local prototype database.
- The account can be deleted from the local browser.
- Production retention, access control and deletion policies must be finalized before deployment.

## Anti-abuse architecture considered

- Require geofence radius and reasonable location accuracy.
- Reject impossible movement speeds between location updates.
- Prevent repeated quest completion for the same account/node.
- Record quest and journey events for auditability.
- Production should add server-side location attestation, device integrity signals, rate limits and anomaly detection.

## Sustainability / alignment pathway

Potential partners include tourism boards, heritage institutions, local artisans and experience providers. The commercial loop is: traveller discovers → learns → visits → books an experience → local partner benefits.

The prototype does not claim government onboarding or a live ONDC integration. ONDC is documented only as a future open-commerce pathway.

Useful official references:
- Incredible India — Ministry of Tourism: https://www.incredibleindia.gov.in/en
- Incredible India — People & Culture: https://www.incredibleindia.gov.in/en/people-and-culture
- ONDC — Travel & Experiences: https://www.ondc.org/pages/tourism.html
- Telangana Tourism — Charminar: https://tourism.telangana.gov.in/attractions/charminar

## Run

```bash
npm start
```

Run core tests:

```bash
node tests/sutra.test.js
```

## Optional backend scaffold

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Set `ANTHROPIC_API_KEY` server-side before enabling the optional Ask Sutra backend connector. Never commit a real API key or put one in browser JavaScript.
