import { postsTable, user } from "@/db/schema";
import { authGuard, pub } from "@/orpc";
import { blogIdSchema, blogSchema, blogsSchema, createBlogSchema } from "@/schema/blog";
import { eq } from "drizzle-orm";

export const listBlogs = pub.
  route({
    method: "GET",
    path: "/",
    summary: "List all Blogs",
    tags: ["Blogs"]
  }).output(blogsSchema)
  .handler(async ({ context }) => {

    const q = await context.db.select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      userId: postsTable.userId,
      author: {
        name: user.name,
        image: user.image
      }
    }).from(postsTable)
      .innerJoin(user, eq(postsTable.userId, user.id));

    return q
  })

export const createBlog = authGuard
  .route({
    method: "POST",
    path: "/",
    summary: "Create a Blog",
    tags: ["Blogs"],
    successStatus: 201
  }).input(createBlogSchema)
  .output(blogSchema)
  .handler(async ({ input, context, errors }) => {

    const post = await context.db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(postsTable)
        .values({
          title: input.title,
          content: input.content,
          userId: context.session.user.id
        })
        .returning();

      const [full] = await tx
        .select({
          id: postsTable.id,
          title: postsTable.title,
          content: postsTable.content,
          userId: postsTable.userId,
          author: {
            name: user.name,
            image: user.image,
          },
        })
        .from(postsTable)
        .innerJoin(user, eq(postsTable.userId, user.id))
        .where(eq(postsTable.id, inserted.id));

      return full;
    });

    return post
  })

export const findBlog = pub.
  route({
    method: "GET",
    path: "/{id}",
    summary: "Find a Blog",
    tags: ["Blogs"],
  })
  .errors({
    NOT_FOUND: {
      message: "Blog not found."
    }
  })
  .input(blogIdSchema)
  .output(blogSchema)
  .handler(async ({ input, context, errors }) => {

    const post = await context.db.query.postsTable.findFirst({
      where: eq(postsTable.id, Number(input.id)),
      columns: { id: true, title: true, content: true, userId: true },
      with: {
        author: {
          columns: {
            name: true,
            image: true
          }
        }
      }
    })

    if (!post) {
      throw errors.NOT_FOUND();
    }

    return post;
  })
