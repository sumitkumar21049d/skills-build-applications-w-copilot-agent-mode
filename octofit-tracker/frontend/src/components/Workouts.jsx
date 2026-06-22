import { useEffect, useState } from "react";
import { API_BASE } from "../apiBase";

export default function Workouts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Workouts</h2>
      <ul>{data.map(w => <li key={w.id}>{w.name}</li>)}</ul>
    </>
  );
}