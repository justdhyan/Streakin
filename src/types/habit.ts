
export type HabitIcon = 
  | "star" 
  | "circle-check" 
  | "circle-plus"
  | "progress"
  | "calendar"
  | "bell"
  | "repeat"
  | "edit";

export type Distraction = {
  date: string;
  reason: string;
  habitId: string;
};

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  color: string;
  streak: number;
  completedDates: string[];
  remindTime?: string;
  createdAt: string;
  distractions: Distraction[];
}
