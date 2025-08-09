import { Server, Member, Profile } from "./lib/generated/prisma";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type ServerWithMembersAndProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
