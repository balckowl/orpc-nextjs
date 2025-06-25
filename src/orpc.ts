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

export const authGuard = base.use(
  async ({ context, next }) => {
    if (!context.session) {
      throw new ORPCError(
        "UNAUTHORIZED",
        { message: 'Unauthorized' } 
      );
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
