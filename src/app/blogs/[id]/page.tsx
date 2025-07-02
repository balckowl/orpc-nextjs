import { orpc } from "@/lib/orpc";
import { isDefinedError, safe } from "@orpc/client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {

  const { id } = await params

  const {
    error,
    data,
  } = await safe(orpc.blog.find({ id: Number(id) }))


  if (isDefinedError(error)) {
    if (error.code === "NOT_FOUND") return notFound();
  } else if (error) {
    throw error
  } else {
    return (
      <div>{data.title}</div>
    );
  }
}
