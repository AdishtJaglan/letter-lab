const rateLimitStore = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowSize = 60000; // 1 minute window
  const maxRequests = 20; // max 20 req/min

  // Initialize or reset the request count if window has passed
  if (!rateLimitStore[ip] || now - rateLimitStore[ip].startTime > windowSize) {
    rateLimitStore[ip] = {
      count: 1,
      startTime: now,
    };
  } else {
    rateLimitStore[ip].count += 1;
  }

  // Check if the request count exceeds the maximum allowed
  if (rateLimitStore[ip].count > maxRequests) {
    return res
      .status(429)
      .json({ message: "Too Many Requests, try again later." });
  }

  next();
};

export default rateLimiter;
