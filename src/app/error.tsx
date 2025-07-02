"use client"

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {

  useEffect(() => {
    console.log(error)
  },[error])

  return (
    <div>
      <h2>なんかエラーになっちゃったね。</h2>
      <button onClick={() => reset()}>
        もう一度試す
      </button>
    </div>
  );
}


