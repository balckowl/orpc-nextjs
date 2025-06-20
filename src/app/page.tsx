import LoginButton from "@/components/LoginButton";
import { orpc } from "@/lib/orpc";
import { safe } from "@orpc/client";

export default async function Page() {

  const { error, data } = await safe(orpc.blog.list())

  if(error) throw error

  return (
    <div>
      {data.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
      <LoginButton />
    </div>
  );
}
