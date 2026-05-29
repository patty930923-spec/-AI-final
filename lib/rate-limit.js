const buckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(req, { limit = 20, windowMs = 600000 } = {}) {
  const ip = getClientIp(req);
  const now = Date.now();
  let entry = buckets.get(ip);

  if (!entry || now - entry.start > windowMs) {
    entry = { count: 0, start: now };
  }

  entry.count += 1;
  buckets.set(ip, entry);

  if (buckets.size > 5000) {
    buckets.clear();
  }

  return entry.count <= limit;
}

module.exports = { checkRateLimit, getClientIp };
