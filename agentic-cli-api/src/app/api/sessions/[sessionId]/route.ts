import { NextResponse } from "next/server";

import { deleteSession, findSession } from "@/lib/store";

export const dynamic = "force-dynamic";

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

  return NextResponse.json(
    {
      session
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  const removed = deleteSession(params.sessionId);

  if (!removed) {
    return NextResponse.json(
      {
        error: `Session "${params.sessionId}" was not found.`
      },
      {
        status: 404
      }
    );
  }

  return NextResponse.json(
    {
      success: true
    },
    {
      status: 200
    }
  );
}
