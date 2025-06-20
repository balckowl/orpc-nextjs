import { orpc } from "@/lib/orpc";
import { safe } from "@orpc/client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {

  const { id } = await params

  const { error, data, isDefined } = await safe(orpc.blog.find({ id: Number(id) }))

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
