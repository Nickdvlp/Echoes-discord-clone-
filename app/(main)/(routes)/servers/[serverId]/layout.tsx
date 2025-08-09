import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
}
const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProfile();
  const serverId = params.serverId;

  if (!profile) {
    redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  return (
    <div className="h-full flex">
      <div className="hidden md:flex w-60 z-20 flex-col h-full inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
