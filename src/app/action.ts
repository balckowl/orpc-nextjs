'use server'

import { createORPCContext } from "@/context"
import { createBlog } from "@/router/blog"
import { createORPCClient, onError, onSuccess } from "@orpc/client"
import { redirect } from "next/navigation"

export const createBlogActions = createBlog.actionable({
  context: await createORPCContext(),
  interceptors: [
    onSuccess(async output => redirect("/")),
    onError(async error => console.error(error)),
  ]
})
