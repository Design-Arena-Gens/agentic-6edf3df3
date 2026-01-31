import { NextResponse } from "next/server";
import { z } from "zod";

import { createSession, listSessions } from "@/lib/store";

export const dynamic = "force-dynamic";

const createSessionSchema = z
  .object({
    name: z.string().min(1).max(80).optional(),
    metadata: z
      .record(
        z.string(),
        z.union([z.string(), z.number(), z.boolean(), z.null()])
      )
      .optional()
  })
  .nullish();

export async function GET() {
  const sessions = listSessions();
  return NextResponse.json(
    {
      sessions
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = createSessionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid session payload.",
        details: parsed.error.flatten()
      },
      {
        status: 400
      }
    );
  }

  const session = createSession(parsed.data ?? {});

  return NextResponse.json(
    {
      session
    },
    {
      status: 201
    }
  );
}
