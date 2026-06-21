import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { connectToDatabase, MONGO_URI } from './database.js';

const app = express();

// ✅ Use env PORT fallback
const PORT = process.env.PORT || 8000;

// ✅ REQUIRED for MS Learn validation
const CODESPACE_NAME = process.env.CODESPACE_NAME;

// ✅ ✅ FIXED URL (important correction)
const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// ✅ Enable CORS (needed for frontend calls)
app.use(cors());

app.use(express.json());

// ✅ Health endpoint (kept same, just cleaner arrow syntax)
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'OctoFit Tracker backend',
    apiUrl: API_HOST
  });
});

// ✅ Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// ✅ Start server after DB
connectToDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    // ✅ IMPORTANT: bind 0.0.0.0 for Codespaces
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server listening on ${API_HOST}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });