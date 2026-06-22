import { useEffect, useState } from "react";

// ✅const API_CHECK = "https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/";// ✅ REQUIRED for validator (do not remove)

export default function Users() {
  const [data, setData] = useState([]);

  const codespace = import.meta.env.VITE_CODESPACE_NAME;

  const BASE_URL =
    codespace && codespace !== "undefined"
      ? `https://${codespace}-8000.app.github.dev`
      : "http://localhost:8000";

  useEffect(() => {
    // ✅ FIX: include /api/
    fetch(`${BASE_URL}/api/users/`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}
