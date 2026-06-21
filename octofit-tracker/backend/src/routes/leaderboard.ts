import { Router } from 'express';
import { LeaderboardModel } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

export default router;
