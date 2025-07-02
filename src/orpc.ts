import { ORPCError, os } from '@orpc/server'
import { createORPCContext, ORPCContext } from './context';

export const base = os
  .$context<ORPCContext>()
  .use(async ({ next }) => {
    return next({
      context: await createORPCContext(),
    });
  });

export const pub = base;

export const authGuard = base.
  errors({
    "UNAUTHORIZED": {
      message: "Authorization required."
    }
  })
  .use(
    async ({ context, next, errors }) => {
      if (!context.session) {
        throw errors.UNAUTHORIZED()
      }

      return next({
        context: {
          session: context.session,
        },
      });
    },
  );


// export const pub = os.
//   use(dbProviderMiddleware)

// export const authGuard = pub.
//   use(requiredAuthMiddleware)
