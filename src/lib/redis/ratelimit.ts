import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./client";

/**
 * Each limiter is null when Upstash isn't configured — callers must check
 * before use and skip rate limiting rather than throwing (degrade gracefully).
 */
export const orderPlacementLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m"), prefix: "rl:order" })
  : null;

export const phoneIdentifyLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(5, "1 m"), prefix: "rl:phone" })
  : null;

export const uploadLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, "1 h"), prefix: "rl:upload" })
  : null;

export async function checkLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ allowed: boolean }> {
  if (!limiter) return { allowed: true };
  const { success } = await limiter.limit(identifier);
  return { allowed: success };
}
