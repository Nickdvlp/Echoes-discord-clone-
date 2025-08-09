import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await auth();
  if (!user || !user.userId) {
    throw new Error("Unauthorized");
  }

  return { userId: user.userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log("image uploaded");
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete((file) => {
      console.log("image uploaded");
      console.log("URL:>>>>>>>>>", file.file.name);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
