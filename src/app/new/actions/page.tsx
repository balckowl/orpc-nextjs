"use client"

import { createBlogActions } from '@/app/action';
import { useServerAction } from '@orpc/react/hooks'
import { getIssueMessage, parseFormData } from '@orpc/react'

export default function Page() {

  const { execute, error, status } = useServerAction(createBlogActions)

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">ブログ投稿フォーム</h1>
      <form action={(form) => { execute(parseFormData(form)) }} className="space-y-6">
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            id="title"
            name="title"
            placeholder="タイトルを入力"
            className={`
              block w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            `}
          />
          <p style={{ color: 'red' }}>{getIssueMessage(error, 'title')}</p>
        </div>

        {/* コンテンツ */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            コンテンツ
          </label>
          <textarea
            id="content"
            name='content'
            placeholder="コンテンツを入力"
            rows={6}
            className={`
              block w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            `}
          />
          <p style={{ color: 'red' }}>{getIssueMessage(error, 'content')}</p>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className={`
            w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
          `}
        >
          {status === "pending" ? "送信中…" : "送信"}
        </button>
      </form>
    </div>
  );
}
