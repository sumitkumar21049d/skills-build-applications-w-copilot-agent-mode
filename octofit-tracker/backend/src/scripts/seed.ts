import mongoose from 'mongoose';
import { UserModel } from '../models/user.js';
import { TeamModel } from '../models/team.js';
import { ActivityModel } from '../models/activity.js';
import { WorkoutModel } from '../models/workout.js';
import { LeaderboardModel } from '../models/leaderboard.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.db.dropDatabase();

  const users = await UserModel.create([
    { name: 'Avery Jones', email: 'avery.jones@example.com', role: 'athlete', team: 'Ironclad', createdAt: new Date('2026-05-12') },
    { name: 'Mia Patel', email: 'mia.patel@example.com', role: 'coach', team: 'Ironclad', createdAt: new Date('2026-05-15') },
    { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'athlete', team: 'PulseRunners', createdAt: new Date('2026-05-18') }
  ]);

  const teams = await TeamModel.create([
    { name: 'Ironclad', description: 'Strength and consistency focused team.', members: [users[0].email, users[1].email], createdAt: new Date('2026-05-01') },
    { name: 'PulseRunners', description: 'Cardio athletes who love leaderboard challenges.', members: [users[2].email], createdAt: new Date('2026-05-06') }
  ]);

  const workouts = await WorkoutModel.create([
    { title: 'Morning HIIT Blast', description: 'High-intensity interval training for a fast cardio burn.', difficulty: 'intermediate', durationMinutes: 35, focusAreas: ['cardio', 'endurance'] },
    { title: 'Strength Builder Circuit', description: 'Full-body strength circuit with compound lifts.', difficulty: 'advanced', durationMinutes: 50, focusAreas: ['strength', 'hypertrophy'] },
    { title: 'Recovery Yoga Flow', description: 'Gentle stretching and mobility for active recovery.', difficulty: 'beginner', durationMinutes: 25, focusAreas: ['mobility', 'recovery'] }
  ]);

  const activities = await ActivityModel.create([
    { userEmail: users[0].email, type: 'Run', durationMinutes: 45, caloriesBurned: 520, occurredAt: new Date('2026-06-19T07:30:00Z') },
    { userEmail: users[0].email, type: 'Strength Training', durationMinutes: 60, caloriesBurned: 610, occurredAt: new Date('2026-06-20T17:00:00Z') },
    { userEmail: users[2].email, type: 'Cycling', durationMinutes: 55, caloriesBurned: 450, occurredAt: new Date('2026-06-20T06:45:00Z') }
  ]);

  const leaderboardEntries = await LeaderboardModel.create([
    { name: users[0].name, type: 'user', score: 1340, rank: 1 },
    { name: users[2].name, type: 'user', score: 1180, rank: 2 },
    { name: teams[0].name, type: 'team', score: 2520, rank: 1 },
    { name: teams[1].name, type: 'team', score: 1180, rank: 2 }
  ]);

  console.log('Seed complete:', {
    users: users.length,
    teams: teams.length,
    workouts: workouts.length,
    activities: activities.length,
    leaderboard: leaderboardEntries.length
  });

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
