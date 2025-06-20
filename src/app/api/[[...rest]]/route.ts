import { router } from '@/router'
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { onError } from '@orpc/server'
import {
  experimental_ZodSmartCoercionPlugin as
    ZodSmartCoercionPlugin,
  experimental_ZodToJsonSchemaConverter as
    ZodToJsonSchemaConverter
} from '@orpc/zod/zod4'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'

const openAPIHandler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
  plugins: [
    new ZodSmartCoercionPlugin(),
    new OpenAPIReferencePlugin({
      schemaConverters: [
        new ZodToJsonSchemaConverter(),
      ],
      specGenerateOptions: {
        info: {
          title: 'ORPC Playground',
          version: '1.0.0',
        },
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
      },
      docsConfig: {
        authentication: {
          securitySchemes: {
            bearerAuth: {
              token: 'default-token',
            },
          },
        },
      },
    }),
  ],
})

async function handleRequest(request: Request) {
  const { response } = await openAPIHandler.handle(request, {
    prefix: '/api',
    context: {},
  })

  return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
