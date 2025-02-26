// types.ts
export interface TrainingProgram {
    id: string;
    name: string;
    description: string;
    workouts: string[]; // Workout IDs
  }
  
  export interface Workout {
    id: string;
    name: string;
    exercises: string[]; // Exercise IDs
  }
  
  export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }
  
  export interface DietPlan {
    id: string;
    name: string;
    dailyCalories: number;
    macros: { protein: number; carbs: number; fat: number };
    meals: string[]; // Meal IDs
  }
  
  export interface Meal {
    id: string;
    name: string;
    foods: string[]; // Food IDs
  }
  
  export interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }