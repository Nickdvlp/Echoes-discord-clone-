import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  classsName?: string;
}
const UserAvatar = ({ src, classsName }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10 ", classsName)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
