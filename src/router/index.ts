import { os } from "@orpc/server";
import { createBlog, findBlog, listBlogs } from "./blog";

export const router = os.prefix("/blogs").router({
  blog: {
    list: listBlogs,
    find: findBlog,
    create: createBlog
  }
})
