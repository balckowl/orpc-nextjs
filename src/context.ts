import { cache } from "react";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import { db } from "./db"

export const createORPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return {
    db,
    session,
  };
});


export type ORPCContext = Awaited<ReturnType<typeof createORPCContext>>;
