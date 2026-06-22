import { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]);

  const codespace = import.meta.env.VITE_CODESPACE_NAME;

  const BASE_URL =
    codespace && codespace !== "undefined"
      ? `https://${codespace}-8000.app.github.dev`
      : "http://localhost:8000";

  useEffect(() => {
    fetch(`${BASE_URL}/users/`) // ✅ IMPORTANT: trailing slash
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}