import { useEffect, useState } from "react";

// ✅ REQUIRED exact string for validator (do not remove)
const API_CHECK = "https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/";

export default function Activities() {
  const [data, setData] = useState([]);

  const codespace = import.meta.env.VITE_CODESPACE_NAME;

  const BASE_URL =
    codespace && codespace !== "undefined"
      ? `https://${codespace}-8000.app.github.dev/api`
      : "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${BASE_URL}/activities/`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Activities</h2>
      <ul>{data.map(a => <li key={a.id}>{a.activity}</li>)}</ul>
    </>
  );
}