import { z } from "zod/v4";
import { createSelectSchema } from "drizzle-zod"
import { postsTable, user } from "@/db/schema";
import { experimental_JSON_SCHEMA_REGISTRY as JSON_SCHEMA_REGISTRY } from "@orpc/zod/zod4";

export const userSelectSchema = createSelectSchema(user)
export const userSchema = userSelectSchema.pick({
  name: true,
  image: true
}).extend({
  image: z.url().nullable()
})

JSON_SCHEMA_REGISTRY.add(userSchema, {
  description: "User schema",
  examples: [{
    name: "y_ta",
    image: "https://avatars.githubusercontent.com/u/xxxxxxxx?v=4"
  }]
})

export const blogSelectSchema = createSelectSchema(postsTable)
export const blogSchema = blogSelectSchema.extend({
  author: userSchema
})

JSON_SCHEMA_REGISTRY.add(blogSchema, {
  description: "Blog schema",
  examples: [{
    id: 1,
    title: "こんばんは",
    content: "こんばんは",
    userId: "cmdcmdso",
    author: {
      name: "y_ta",
      image: "https://avatars.githubusercontent.com/u/xxxxxxxx?v=4"
    }
  }]
})

export const blogsSchema = z.array(blogSchema)

export const blogIdSchema = z.object({
  id: z.string()
})

//どうせ上書きする
export const createBlogSchema = z.object({
  title: z.string().min(1, { message: "入力してください" }),
  content: z.string().min(1, { message: "入力してください" })
})

