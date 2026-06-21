import { useEffect, useState } from "react";
import { API_BASE } from "../apiBase";

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Users</h2>
      <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </>
  );
}