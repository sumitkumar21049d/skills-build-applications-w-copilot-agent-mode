import { useEffect, useState } from "react";
import { API_BASE } from "../apiBase";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Leaderboard</h2>
      <ul>{data.map(l => <li key={l.id}>{l.name} - {l.score}</li>)}</ul>
    </>
  );
}