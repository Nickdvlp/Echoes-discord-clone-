import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },

        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_LEAVE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
