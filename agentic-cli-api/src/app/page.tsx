const endpoints = [
  {
    method: "GET",
    path: "/api/spec",
    summary: "Retrieve machine-readable specification for auto-config."
  },
  {
    method: "GET",
    path: "/api/commands",
    summary: "List supported Agentic CLI commands."
  },
  {
    method: "POST",
    path: "/api/sessions",
    summary: "Create a session that mirrors the Agentic CLI lifecycle."
  },
  {
    method: "POST",
    path: "/api/sessions/:sessionId/messages",
    summary: "Invoke a command within a given session."
  }
] as const;

const features = [
  {
    title: "Session aware",
    body: "Sessions maintain deterministic command history so the Kilo extension can hydrate side-panels instantly without websocket plumbing."
  },
  {
    title: "Deterministic handlers",
    body: "Command responses are synthetic but stable, allowing local previews, unit tests, and mock-driven development against the Agentic CLI contract."
  },
  {
    title: "Extension ready",
    body: "Every response is slim JSON with timestamps, IDs, and optional metadata—ideal for rendering inside VS Code tree views and terminal overlays."
  },
  {
    title: "Cache friendly",
    body: "All endpoints are no-store by default so the Kilo extension will always see fresh state without juggling cache headers manually."
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6 py-16 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-400">
              Agentic CLI → REST
            </p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              A deployment-ready API facade for the Agentic CLI.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              Drop this service onto Vercel and point the Kilo VSCode extension at
              it to orchestrate automated workflows, simulate CLI runs, and hydrate
              session-aware dashboards without leaving your editor.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/api/spec"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/60"
              >
                Inspect JSON spec
              </a>
              <a
                href="https://kilo.docs.enhanced.tools"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-800 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-700/60"
              >
                Kilo extension docs
              </a>
            </div>
          </div>
          <div className="mt-12 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
            <h2 className="text-sm font-semibold text-slate-200">
              Kilo endpoint bootstrap
            </h2>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60 p-4 text-xs text-slate-100">
{`// settings.json snippet
"kilo.agent.apiBaseUrl": "https://agentic-6edf3df3.vercel.app",
"kilo.agent.sessionName": "VSCode automation bridge",
"kilo.agent.defaultCommand": "plan-workflow"`}
            </pre>
            <p className="text-xs text-slate-400">
              The API returns deterministic payloads, making it safe to wire into
              command palettes, tree views, or custom panels without guarding for
              nulls.
            </p>
          </div>
        </div>
      </div>

      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-white">Endpoints</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">
            The service mirrors the Agentic CLI lifecycle. Wire the endpoints into
            command palettes or VSCode panels to create an end-to-end automation
            cockpit inside Kilo.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-700"
              >
                <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                  {endpoint.method}
                </span>
                <p className="mt-3 font-mono text-sm text-white">{endpoint.path}</p>
                <p className="mt-2 text-sm text-slate-400">{endpoint.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950 px-6 py-16 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white">Quickstart</h2>
            <ol className="mt-6 space-y-4 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-white">1.</span> Create a session:
                <code className="ml-2 rounded border border-slate-700 bg-black/40 px-2 py-1 text-xs">
                  curl -X POST https://agentic-6edf3df3.vercel.app/api/sessions
                </code>
              </li>
              <li>
                <span className="font-semibold text-white">2.</span> Invoke a command:
                <code className="ml-2 rounded border border-slate-700 bg-black/40 px-2 py-1 text-xs">
                  {`curl -X POST /api/sessions/$SESSION/messages -d "..."`}
                </code>
              </li>
              <li>
                <span className="font-semibold text-white">3.</span> Stream history via
                <code className="ml-2 rounded border border-slate-700 bg-black/40 px-2 py-1 text-xs">
                  GET /api/sessions/$SESSION/messages
                </code>
                .
              </li>
              <li>
                <span className="font-semibold text-white">4.</span> Tear down the
                session when you are done to reset history.
              </li>
            </ol>
          </div>
          <div className="flex-1 space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-sm font-semibold text-slate-200">
              Sample workflow (shell)
            </h3>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60 p-4 text-xs text-slate-100">
{`SESSION=$(curl -s -X POST https://agentic-6edf3df3.vercel.app/api/sessions | jq -r '.session.id')
curl -s -X POST https://agentic-6edf3df3.vercel.app/api/sessions/$SESSION/messages \\
  -H "Content-Type: application/json" \\
  -d '{"command":"plan-workflow","payload":{"goal":"Ship nightly CI lint + test"}}' | jq
curl -s https://agentic-6edf3df3.vercel.app/api/sessions/$SESSION/messages | jq '.history[0]'`}
            </pre>
            <p className="text-xs text-slate-400">
              The deterministic responses make it safe to power dashboards, quick
              fixes, or AI-augmented terminals inside VS Code.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-white">
            Built for extension authors
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
