import { db as connectDB, DB } from "@/db"
import { os } from "@orpc/server"

export const dbProviderMiddleware = os
  .$context<{ db?: DB }>()
  .middleware(async ({ context, next }) => {

    const db: DB = context.db ?? connectDB

    return next({
      context: {
        db,
      },
    })
  })
