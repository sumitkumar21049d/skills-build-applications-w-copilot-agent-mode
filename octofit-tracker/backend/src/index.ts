import express from 'express';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { connectToDatabase, MONGO_URI } from './config/database.js';

const app = express();
const PORT = 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_HOST = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.githubpreview.dev` : `http://127.0.0.1:${PORT}`;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker backend', apiUrl: API_HOST });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectToDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server listening on ${API_HOST}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
