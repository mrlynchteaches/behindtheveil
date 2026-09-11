# Behind the Veil

A public, privacy-preserving classroom simulation about healthcare access, equity, and outcomes.

## Run locally

```bash
npm run dev
```

The current user interface includes the complete solo simulation, deterministic outcome engine, six trial rounds, 20 residents, tiered policies, local recovery, CSV export, and print-to-PDF reporting. The Worker contains the temporary room API foundation. The static application has no runtime package dependencies.

## Test and build

```bash
npm test
npm run build
```

## Deploy to Cloudflare

1. Create a Cloudflare account and authenticate Wrangler with `npx wrangler login`.
2. Review `wrangler.jsonc`, especially the compatibility date.
3. Run `npm run deploy`.
4. Open the assigned `workers.dev` URL; no custom domain is required.
5. Ask the district to allow the deployment hostname and secure WebSocket traffic.

Rooms are stored in one Durable Object instance each. They expire after one hour or when the host calls the erase endpoint. Do not add analytics, error tracking containing request bodies, or editable student names without completing a new privacy review.

## Content editing

Canonical starter content is currently in `src/data/content.js`. CSV schemas and a browser validator are planned for the next content-authoring increment. Changes to effect weights should be tested with identical seeds across policy configurations and reviewed for unintended identity-based penalties.

## Important limitation

The real-time API foundation is implemented, but the classroom UI in this package defaults to solo/local operation while the teacher lobby, student join screen, group voting synchronization, XLSX/ZIP generation, and full class report aggregation undergo implementation and load testing. Do not describe this version as classroom-ready for a live 25-device session yet.
