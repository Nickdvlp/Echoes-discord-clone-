import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface ServerIdProps {
  serverId: string;
}
export async function PATCH(
  req: Request,
  context: { params: Promise<ServerIdProps> }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await context.params;
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server id is missing.", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
