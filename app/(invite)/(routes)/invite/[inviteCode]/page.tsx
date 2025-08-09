import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface PageParams {
  inviteCode: string;
}

export default async function InviteCodePage({
  params,
}: {
  params: PageParams;
}) {
  const profile = await currentProfile();

  if (!profile) redirect("/sign-in");

  if (!params.inviteCode) redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (existingServer) redirect(`/servers/${existingServer.id}`);

  const server = await db.server.findFirst({
    where: { inviteCode: params.inviteCode },
  });

  if (!server) redirect("/");

  await db.server.update({
    where: { id: server.id },
    data: {
      members: { create: { profileId: profile.id } },
    },
  });

  redirect(`/servers/${server.id}`);
}
