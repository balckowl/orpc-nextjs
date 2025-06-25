import { createBlog, findBlog, listBlogs } from "./blog";
import { pub } from "@/orpc";

export const router = pub.prefix("/blogs").router({
  blog: {
    list: listBlogs,
    find: findBlog,
    create: createBlog
  }
})
