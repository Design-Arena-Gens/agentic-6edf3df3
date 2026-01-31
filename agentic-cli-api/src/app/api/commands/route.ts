import { NextResponse } from "next/server";

import { getCommands } from "@/lib/commands";

export const dynamic = "force-dynamic";

export async function GET() {
  const commands = getCommands();
  return NextResponse.json(
    {
      commands
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
