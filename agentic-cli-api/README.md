## Agentic CLI API Bridge

This project exposes a hosted REST facade for the Agentic CLI so the Kilo VSCode extension (and other tooling) can connect to agentic workflows over HTTPS instead of a local terminal.

The API is implemented with Next.js App Router. Responses are deterministic and well structured which makes them ideal for editor integrations, dashboards, and automated testing.

### Key Capabilities

- `/api/spec` — JSON envelope describing the API contract and command catalogue.
- `/api/commands` — discoverable list of simulated Agentic CLI commands.
- `/api/sessions` — create/list/destroy session state that mirrors CLI lifecycles.
- `/api/sessions/:id/messages` — queue command invocations and read structured history.

All endpoints return `Cache-Control: no-store` headers to ensure extension clients always pull the latest state without extra configuration.

### Running Locally

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000). The homepage documents API usage; endpoints live under `/api/*`.

### Production Build

```bash
npm run build
npm run start
```

### Example Integration Snippet

```jsonc
// VSCode settings.json
"kilo.agent.apiBaseUrl": "https://agentic-6edf3df3.vercel.app",
"kilo.agent.sessionName": "VSCode automation bridge",
"kilo.agent.defaultCommand": "plan-workflow"
```

These settings allow the Kilo extension to talk to the API without custom glue code.
