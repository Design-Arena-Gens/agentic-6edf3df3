import { NextResponse } from "next/server";
import { z } from "zod";

import { listSessionInvocations, invokeCommand, findSession } from "@/lib/store";

export const dynamic = "force-dynamic";

const invocationSchema = z.object({
  command: z.enum([
    "list-capabilities",
    "plan-workflow",
    "execute-shell",
    "fetch-logs",
    "status-check"
  ]),
  payload: z
    .record(z.string(), z.any())
    .optional()
});

export async function GET(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  const session = findSession(params.sessionId);

  if (!session) {
    return NextResponse.json(
      {
        error: `Session "${params.sessionId}" was not found.`
      },
      {
        status: 404
      }
    );
  }

  const history = listSessionInvocations(params.sessionId);

  return NextResponse.json(
    {
      session,
      history
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const payload = await request.json().catch(() => null);
  const parsed = invocationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid invocation payload.",
        details: parsed.error.flatten()
      },
      {
        status: 400
      }
    );
  }

  try {
    const invocation = invokeCommand(params.sessionId, parsed.data);

    return NextResponse.json(
      {
        invocation
      },
      {
        status: 200
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to execute command."
      },
      {
        status: 404
      }
    );
  }
}
