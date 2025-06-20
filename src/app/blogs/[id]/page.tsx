import { orpc } from "@/lib/orpc";
import { safe } from "@orpc/client";
import { notFound } from "next/navigation";

export default async function Page() {

  const { error, data, isDefined } = await safe(orpc.blog.find({ id: 1 }))

  if (error) {
    if (isDefined) {
      if (error.code === "NOT_FOUND") return notFound();
    } else {
      throw error;
    }
    return;
  }

  return (
    <div>{data.title}</div>
  );
}
