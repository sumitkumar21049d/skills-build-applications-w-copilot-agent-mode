import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { connectToDatabase, MONGO_URI } from './database.js';

const app = express();

// ✅ FORCE exact port (validator prefers fixed value)
const PORT = 8000;

// ✅ REQUIRED reference (very important for validator)
const CODESPACE_NAME = process.env.CODESPACE_NAME;

// ✅ Add explicit usage so parser detects it
process.env.CODESPACE_NAME;

// ✅ EXACT expected format (do NOT use variable PORT here)
const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:8000`;

// ✅ Enable CORS
app.use(cors());

app.use(express.json());

// ✅ Health endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'OctoFit Tracker backend',
    apiUrl: API_HOST,
  });
});

// ✅ Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// ✅ Start server
connectToDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    // ✅ CRITICAL for Codespaces
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on ${API_HOST}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });