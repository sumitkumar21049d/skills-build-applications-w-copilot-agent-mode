import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusAreas: string[];
}

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  focusAreas: { type: [String], default: [] }
});

export const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);
