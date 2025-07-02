const axios = require("axios");

const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
const PING_TARGET_URL = RENDER_EXTERNAL_URL ? `${RENDER_EXTERNAL_URL}/` : null;
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

let keepAliveIntervalId = null;

const selfPing = async () => {
  if (!PING_TARGET_URL) {
    console.log(
      "[Keep-Alive] RENDER_EXTERNAL_URL not set. Skipping self-ping."
    );
    return;
  }

  try {
    console.log(`[Keep-Alive] Sending self-ping to ${PING_TARGET_URL}...`);
    const response = await axios.get(PING_TARGET_URL);
    console.log(`[Keep-Alive] Self-ping successful: Status ${response.status}`);
  } catch (error) {
    console.error(`[Keep-Alive] Self-ping failed: ${error.message}`);
  }
};

const startKeepAlive = () => {
  if (process.env.NODE_ENV === "production" && RENDER_EXTERNAL_URL) {
    console.log(
      `[Keep-Alive] Production environment detected. Starting keep-alive task for URL: ${PING_TARGET_URL}`
    );
    // Initial ping after a short delay
    setTimeout(selfPing, 5000);
    keepAliveIntervalId = setInterval(selfPing, PING_INTERVAL_MS);
  } else {
    console.log(
      "[Keep-Alive] Keep-alive task skipped (Not in production or RENDER_EXTERNAL_URL not set)."
    );
  }
};

const stopKeepAlive = () => {
  if (keepAliveIntervalId) {
    clearInterval(keepAliveIntervalId);
    keepAliveIntervalId = null;
    console.log("[Keep-Alive] Keep-alive task stopped.");
  }
};

module.exports = { startKeepAlive, stopKeepAlive };
