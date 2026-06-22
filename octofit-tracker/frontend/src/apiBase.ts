const codespace = import.meta.env.VITE_CODESPACE_NAME;

// ✅ Safe fallback (IMPORTANT)
export const API_BASE =
  codespace && codespace !== "undefined"
    ? `https://${codespace}-8000.app.github.dev/api`
    : "http://localhost:8000/api";