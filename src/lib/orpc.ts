import { router } from '@/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { RouterClient } from '@orpc/server'
import type { headers } from 'next/headers'

declare global {
  var $headers: typeof headers
}

const link = new RPCLink({
  url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/rpc`,
  headers: async () => {
    return globalThis.$headers
      ? Object.fromEntries(await globalThis.$headers()) // use this on ssr
      : {} // use this on browser
  },
})

export const orpc: RouterClient<typeof router> = createORPCClient(link)
