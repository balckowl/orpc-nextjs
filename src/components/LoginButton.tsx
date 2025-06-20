"use client"

import { signIn } from "@/lib/auth-client";

export default function LoginButton() {
    return (
        <button type="button" onClick={signIn}>
          ログイン
        </button>
    );
}
