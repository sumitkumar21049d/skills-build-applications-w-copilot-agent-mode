import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  occurredAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userEmail: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  occurredAt: { type: Date, default: () => new Date() }
});

export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);
