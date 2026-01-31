import { NextResponse } from "next/server";

import { getCommandById } from "@/lib/commands";
import { AgenticCommandId } from "@/lib/types";

export const dynamic = "force-dynamic";

const isAgenticCommandId = (value: string): value is AgenticCommandId => {
  return [
    "list-capabilities",
    "plan-workflow",
    "execute-shell",
    "fetch-logs",
    "status-check"
  ].includes(value);
};

export async function GET(
  _request: Request,
  { params }: { params: { commandId: string } }
) {
  if (!isAgenticCommandId(params.commandId)) {
    return NextResponse.json(
      {
        error: `Command "${params.commandId}" is not recognised.`,
        suggestion: "Call /api/commands to inspect the supported catalogue."
      },
      {
        status: 404
      }
    );
  }

  const command = getCommandById(params.commandId);

  if (!command) {
    return NextResponse.json(
      {
        error: `Command "${params.commandId}" is currently unavailable.`
      },
      {
        status: 503
      }
    );
  }

  return NextResponse.json(
    {
      command
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
