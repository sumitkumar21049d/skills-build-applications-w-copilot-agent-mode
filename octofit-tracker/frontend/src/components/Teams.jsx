import { useEffect, useState } from "react";
import { API_BASE } from "../apiBase";

export default function Teams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/teams`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Teams</h2>
      <ul>{data.map(t => <li key={t.id}>{t.name}</li>)}</ul>
    </>
  );
}