"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          className="bg-rose-500 rounded-full absolute text-white right-0 top-0"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          className="bg-rose-500 rounded-full absolute text-white shadow-sm -top-2 -right-2"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        appearance={{
          label: {
            color: "black",
          },
          button: {
            color: "white",
            backgroundColor: "#706dff",
            padding: "10px",
            margin: "10px",
          },
          uploadIcon: {
            color: "#706dff", // purple-600
            height: "100px",
            width: "100px",
          },
        }}
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.[0].url)}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
