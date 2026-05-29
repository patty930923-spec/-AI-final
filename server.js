require("dotenv").config();

const express = require("express");
const path = require("path");
const { checkRateLimit } = require("./lib/rate-limit");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const publicDir = path.join(__dirname, "public");

app.use(express.json({ limit: "32kb" }));
app.use(express.static(publicDir));

app.get("/api/status", (_req, res) => {
  res.json({
    configured: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  });
});

app.post("/api/chat", async (req, res) => {
  if (!checkRateLimit(req)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "OPENAI_API_KEY is not set on the server. Add it in your hosting dashboard.",
    });
  }

  const { messages, model } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const safeMessages = messages
    .filter((m) => m && typeof m.content === "string" && ["system", "user", "assistant"].includes(m.role))
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (safeMessages.length === 0) {
    return res.status(400).json({ error: "No valid messages" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: safeMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI request failed",
      });
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(502).json({ error: "Empty response from OpenAI" });
    }

    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`The Oasis running at http://localhost:${PORT}`);
  console.log(`OpenAI configured: ${Boolean(process.env.OPENAI_API_KEY)}`);
});
