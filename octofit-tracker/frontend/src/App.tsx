import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Activities from "./components/Activities";
import Teams from "./components/Teams";
import Leaderboard from "./components/Leaderboard";
import Workouts from "./components/Workouts";

function App() {
  return (
    <div className="container py-5">
      <h1 className="display-5">OctoFit Tracker</h1>
      <p className="lead">
        Modern multi-tier fitness tracking with React, Express, and MongoDB.
      </p>

      {/* ✅ Navigation (REQUIRED) */}
      <nav className="mb-4">
        <Link to="/" className="me-3">Users</Link>
        <Link to="/activities" className="me-3">Activities</Link>
        <Link to="/teams" className="me-3">Teams</Link>
        <Link to="/leaderboard" className="me-3">Leaderboard</Link>
        <Link to="/workouts">Workouts</Link>
      </nav>

      {/* ✅ Routes (REQUIRED) */}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;