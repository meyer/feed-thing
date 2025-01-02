import { PublicMessageError } from '@workers-utils/common';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (_context, next) => {
  try {
    return await next();
  } catch (error) {
    console.error('middleware error:', error);
    if (error instanceof PublicMessageError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Something went wrong. Tail the logs to see details.', {
      status: 400,
    });
  }
};
