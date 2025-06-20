import { createBlog, findBlog, listBlogs } from "./blog";

export const router = {
  blog: {
    list: listBlogs,
    find: findBlog,
    create: createBlog
  }
}
