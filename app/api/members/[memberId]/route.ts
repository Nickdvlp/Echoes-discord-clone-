import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface MemberIdProps {
  memberId: string;
}
export async function DELETE(
  req: Request,
  context: { params: Promise<MemberIdProps> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { memberId } = await context.params;
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 500 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 400 });
  }
}
export async function PATCH(
  req: Request,
  context: { params: Promise<MemberIdProps> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");
    const { memberId } = await context.params;
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 401 });
    }

    if (!memberId) {
      return new NextResponse("Member Id missing", { status: 401 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH", error);
    return new NextResponse("Internal Error", { status: 400 });
  }
}
