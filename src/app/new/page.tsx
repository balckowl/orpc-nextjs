"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema } from "@/schema/blog";
import { orpc } from "@/lib/orpc";
import { useRouter } from "next/navigation";
import { isDefinedError, safe } from "@orpc/client";

export type CreateBlogInput = z.infer<typeof createBlogSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBlogInput>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateBlogInput> = async (formData) => {
    const { title, content } = formData
    const { error } = await safe(orpc.blog.create({ title, content }))

      if (isDefinedError(error)) {
        if(error.code === "UNAUTHORIZED"){
          alert("認証してないんだけど。")
        }
      } else if (error) {
        alert("エラーが発生しちゃったよ")
      } else {
        alert("投稿に成功しました!")
        router.push("/")
      }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">ブログ投稿フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="タイトルを入力"
            className={`
              block w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${errors.title ? "border-red-500" : "border-gray-300"}
            `}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* コンテンツ */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            コンテンツ
          </label>
          <textarea
            id="content"
            {...register("content")}
            placeholder="コンテンツを入力"
            rows={6}
            className={`
              block w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${errors.content ? "border-red-500" : "border-gray-300"}
            `}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isSubmitting ? "送信中…" : "送信"}
        </button>
      </form>
    </div>
  );
}
