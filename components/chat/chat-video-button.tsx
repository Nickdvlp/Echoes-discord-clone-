"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import ActionTooltip from "../action-tooltip";
import { Video, VideoOff } from "lucide-react";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End Video Call" : "Start Video";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};
