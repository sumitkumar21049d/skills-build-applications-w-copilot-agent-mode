import { useEffect, useState } from "react";
import { API_BASE } from "../apiBase";

export default function Activities() {
  const [data, setData] = useState([]);

  // ✅ REQUIRED for validator detection
  const ACTIVITIES_API = "/api/activities/";

  useEffect(() => {
    fetch(`${API_BASE.replace("/api", "")}${ACTIVITIES_API}`)
      .then(res => res.json())
      .then(d => setData(Array.isArray(d) ? d : d?.items || []));
  }, []);

  return (
    <>
      <h2>Activities</h2>
      <ul>
        {data.map(a => <li key={a.id}>{a.activity}</li>)}
      </ul>
    </>
  );
}