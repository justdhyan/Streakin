
import { Habit } from "@/types/habit";
import { Star } from "lucide-react";

interface HabitStatsProps {
  habits: Habit[];
}

const HabitStats = ({ habits }: HabitStatsProps) => {
  const today = new Date().toISOString().split("T")[0];
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => 
    h.completedDates.includes(today)
  ).length;
  
  const longestStreak = habits.reduce((max, habit) => 
    Math.max(max, habit.streak), 0
  );
  
  const completionRate = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
      <div className="notion-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Today's Progress
        </h3>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold">
            {completedToday}/{totalHabits}
          </span>
          <span className="text-sm text-muted-foreground mb-0.5">habits</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full mt-2">
          <div 
            className="bg-habit-900 dark:bg-habit-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
      
      <div className="notion-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Completion Rate
        </h3>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold">{completionRate}%</span>
          <span className="text-sm text-muted-foreground mb-0.5">completed</span>
        </div>
      </div>
      
      <div className="notion-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Longest Streak
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-2xl font-semibold">{longestStreak}</span>
          <Star size={20} className="text-yellow-500 mb-1" />
          <span className="text-sm text-muted-foreground mb-0.5">days</span>
        </div>
      </div>
    </div>
  );
};

export default HabitStats;
