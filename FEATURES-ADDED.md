# SUTRA-GEO — Grand Finale prototype feature pack

## Core selection/demo flow
- India → state → city/district → clickable heritage node
- 50m geofence proof with current distance, accuracy and unlock state
- Heritage Micro-Quest: 30-second node-specific quiz
- Quest completion → Sutra Coins → Passport journey update
- Repeat-quest protection and impossible-speed/location-consistency checks
- Demo unlock mode is explicitly visible for screening environments

## Heritage intelligence
- 56 curated heritage nodes across 12 states, with coordinates, category, story, image, source and quest
- Location-aware Ask Sutra using the selected/current node context
- Source-backed local answers
- Optional server-side LLM connector scaffold; default browser mode remains grounded and honest
- Explicit implemented vs future AI scope

## Personal journey
- Profile with photo, username and journey statistics
- Photo/video uploads with captions
- Automatic city + heritage-node association from the selected/current context
- City Heritage Passport with clickable cities
- City media grouped by heritage location
- City timeline with quests, visits and uploads
- Scrapbook connected to saved places and uploaded media
- Scrapbook filters: All, Photos, Videos, Stories, Saved Places

## Living heritage
- Monuments, crafts, food, music, dance, festivals, oral history, local traditions and artisans
- Artisan profiles connected to heritage nodes
- Traveller → artisan experience flow
- Booking inquiry capture for stays and artisan experiences
- My Bookings section in Profile

## Community
- Text/photo/video/oral-history/local-tradition story submission
- Moderation states: Submitted → Under Review → Verified → Published
- Visible moderation guidelines
- Prototype leaderboard with fixed demo rows clearly labelled; current user's row is real browser activity

## Rewards and impact
- +10 node discovery
- +30 Heritage Micro-Quest
- +25 itinerary creation
- +40 artisan experience
- Coin history including negative redemption entries
- Functional prototype voucher redemption
- Impact dashboard with explicit Prototype Simulation labeling
- Sustainability and partnership pathway: tourism boards, heritage institutions, artisans/local businesses and future open-commerce integration

## Trip Planner
- Destination → city/district selection
- Working itinerary generation using the expanded heritage dataset
- Time-based stops, food/culture stop and heritage micro-quests
- Route explanation: distance, time, heritage diversity and local experiences
- Save route to scrapbook

## Privacy, accessibility and resilience
- Location consent toggle
- Delete account and uploaded media controls
- Larger text, high contrast and browser text-to-speech
- English/Hindi/Telugu preference demo
- International visitor etiquette, photography and language guidance
- Dynamic city-specific low-connectivity Heritage Pack
- Service-worker cache updated with the new prototype assets
- Visible heritage-data fallback when the dataset fails to load

## Engineering / production-readiness
- Dependency-free Node tests for geofence math, dataset integrity and badge thresholds
- `config.example.js` for optional backend/LLM configuration without shipping secrets
- `backend/` FastAPI scaffold with health, geofence and optional Anthropic proxy endpoint
- `database/schema.sql` PostGIS starting schema for nodes and journey events
- README clearly separates the deployed browser prototype from production architecture

## Latest Grand-Finale Expansion

- Discover now covers **28 Indian states + 112 featured districts**. State cards use imagery; district chips open a working district-detail modal with heritage, food, culture, map, planner and Indian tourism source links.
- Heritage Map now includes the expanded district discovery layer, clickable images for every heritage node, food/event markers, India-wide default view, district focus links, and a working browser geolocation marker + accuracy circle.
- Removed the outdated offline-pack size claim from the map.
- Food expanded to **26 entries** with images and direct official website links where available.
- Events expanded to **25 entries** with images and direct official event/tourism pages.
- Navigation now exposes **Food, Events and Living Heritage** directly.
- Planner now changes by selected state + district + mood and combines nearby district heritage, food and optional festival/event stops rather than returning one fixed route.
- Ask Sutra now resolves app states, districts, heritage nodes, food and events from the local SUTRA-GEO dataset instead of returning one generic answer.
- Quest now has a **Daily Sutra** reward and a **10-question Arena Competition** with score, local leaderboard and bonus Sutra Coins, plus 55+ cultural questions.
- Grounded source links in the prototype use Indian tourism/government or official venue/event websites; international heritage sources were removed from the UI/data source layer.
