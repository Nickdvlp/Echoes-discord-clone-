"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white border-none w-4 h-4 rounded-full"
      ></Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white border-none w-4 h-4 rounded-full"
    ></Badge>
  );
};
