import { NextResponse } from "next/server";

import { getCommands } from "@/lib/commands";
import { AgenticSpecification } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const specification: AgenticSpecification = {
    name: "Agentic CLI REST facade",
    version: "1.0.0",
    description:
      "HTTP wrapper around the Agentic CLI lifecycle designed for the Kilo VSCode extension.",
    contact: {
      name: "Agentic Automation API",
      url: "https://agentic-6edf3df3.vercel.app"
    },
    endpoints: [
      { method: "GET", path: "/api/spec", summary: "Retrieve API specification." },
      {
        method: "GET",
        path: "/api/commands",
        summary: "List support commands for autocomplete."
      },
      {
        method: "GET",
        path: "/api/commands/:commandId",
        summary: "Inspect a single command definition."
      },
      {
        method: "GET",
        path: "/api/sessions",
        summary: "List active CLI sessions."
      },
      {
        method: "POST",
        path: "/api/sessions",
        summary: "Create a new CLI session."
      },
      {
        method: "GET",
        path: "/api/sessions/:sessionId",
        summary: "Retrieve session metadata."
      },
      {
        method: "DELETE",
        path: "/api/sessions/:sessionId",
        summary: "Tear down a session."
      },
      {
        method: "GET",
        path: "/api/sessions/:sessionId/messages",
        summary: "List command invocations for a session."
      },
      {
        method: "POST",
        path: "/api/sessions/:sessionId/messages",
        summary: "Invoke a command in the context of a session."
      }
    ],
    commands: getCommands()
  };

  return NextResponse.json(
    specification,
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
