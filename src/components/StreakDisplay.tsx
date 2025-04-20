
import { Habit } from "@/types/habit";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";

interface StreakDisplayProps {
  habit: Habit;
}

const StreakDisplay = ({ habit }: StreakDisplayProps) => {
  // Get the current week starting from Sunday
  const startOfCurrentWeek = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    const dateStr = format(date, "yyyy-MM-dd");
    const isCompleted = habit.completedDates.includes(dateStr);
    const isToday = isSameDay(date, new Date());
    
    return {
      date,
      dateStr,
      dayName: format(date, "EEE"),
      isCompleted,
      isToday
    };
  });

  return (
    <div className="flex items-center justify-between mt-2 mb-3">
      {weekDays.map((day) => (
        <div key={day.dateStr} className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-1">
            {day.dayName}
          </div>
          <div 
            className={`streak-dot 
              ${day.isCompleted ? "active" : ""} 
              ${day.isToday ? "current" : ""}`}
            title={format(day.date, "PPPP")}
          />
        </div>
      ))}
    </div>
  );
};

export default StreakDisplay;
