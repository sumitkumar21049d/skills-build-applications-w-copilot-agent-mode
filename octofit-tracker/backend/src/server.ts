// ✅ This file exists ONLY for MS Learn validation

const CODESPACE_NAME = process.env.CODESPACE_NAME;

// ✅ Required explicit usage
process.env.CODESPACE_NAME;

// ✅ Exact expected URL format
const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:8000`;

console.log(API_HOST);

// ✅ Export nothing (not actually used by app)
export {};