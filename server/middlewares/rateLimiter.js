import rateLimit from "express-rate-limit";

// Global rate limiter for all routes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

// Stricter rate limiter for API routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many API requests from this IP, please try again after 15 minutes",
  },
});

// Specific rate limiter for GitHub Sync (1 request per 15 mins)
export const githubSyncLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // Limit each IP/user to 1 request per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "GitHub data can only be synced once every 15 minutes. Please wait before syncing again.",
  },
  // Key generator uses user ID if available, otherwise fallback to IP
  keyGenerator: (req) => {
    if (req.user && req.user._id) {
      return req.user._id.toString();
    }
    // Fallback to forwarded IP or remote address to bypass express-rate-limit IPv6 validation error
    // while still effectively rate-limiting by IP for unauthenticated users.
    return (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").toString();
  }
});
