export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Workout {
  id: string;
  createdBy: string;
  name: string;
  description: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
  isKg: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}