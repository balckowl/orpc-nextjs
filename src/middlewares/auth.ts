import { auth } from "@/lib/auth"
import { os } from "@orpc/server"
import { Session, User } from "better-auth"
import { headers } from "next/headers"

export const requiredAuthMiddleware = os
  .errors({
    "UNAUTHORIZED": {
      message: "Authorization required."
    }
  })
  .$context<{ session?: { session?: Session, user?: User } }>()
  .middleware(async ({ next, errors }) => {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user?.id) {
      throw errors.UNAUTHORIZED()
    }

    return next({
      context: { user: session.user },
    })
  })
