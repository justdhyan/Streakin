
import { useState } from "react";
import { Habit } from "@/types/habit";
import { Check, Calendar, Bell, Star, CircleCheck, CirclePlus, ListCheck as Progress, Edit, Repeat, MessageSquare } from "lucide-react";
import DistractionDialog from "./DistractionDialog";
import { Button } from "./ui/button";

interface HabitItemProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
  onLogDistraction: (habitId: string, reason: string) => void;
}

const iconMap = {
  "star": Star,
  "circle-check": CircleCheck,
  "circle-plus": CirclePlus,
  "progress": Progress,
  "calendar": Calendar,
  "bell": Bell,
  "repeat": Repeat,
  "edit": Edit
};

const HabitItem = ({ habit, onComplete, onEdit, onLogDistraction }: HabitItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showDistractionDialog, setShowDistractionDialog] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  const HabitIcon = iconMap[habit.icon];

  const handleComplete = () => {
    if (isCompletedToday) {
      onComplete(habit.id);
    } else {
      onComplete(habit.id);
    }
  };

  return (
    <>
      <div 
        className="notion-card p-4 sm:p-5 mb-4 flex items-center justify-between group transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] animate-fade-in"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div 
            className={`habit-checkbox transition-all duration-300 ${isCompletedToday ? "completed scale-105" : ""} hover:border-habit-500 dark:hover:border-habit-400`}
            onClick={handleComplete}
            role="checkbox"
            aria-checked={isCompletedToday}
            tabIndex={0}
          >
            {isCompletedToday && <Check size={14} className="animate-scale" />}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-2 rounded-md bg-notion-${habit.color} transition-colors duration-200 hover:opacity-90`}>
              <HabitIcon size={16} className="text-habit-800" />
            </div>
            <span className="font-medium text-sm sm:text-base transition-colors duration-200">{habit.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Star size={14} className="text-habit-400" />
            <span className="font-medium">{habit.streak} day{habit.streak !== 1 ? "s" : ""}</span>
          </div>
          
          {habit.remindTime && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Bell size={14} />
              <span>{habit.remindTime}</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className={`transition-all duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowDistractionDialog(true)}
          >
            <MessageSquare size={14} className="text-muted-foreground hover:text-foreground" />
          </Button>
          
          <button 
            className={`p-2 rounded-md hover:bg-secondary transition-all duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => onEdit(habit)}
            aria-label="Edit habit"
          >
            <Edit size={14} className="text-habit-500 hover:text-habit-700 dark:hover:text-habit-300" />
          </button>
        </div>
      </div>

      <DistractionDialog
        isOpen={showDistractionDialog}
        onClose={() => setShowDistractionDialog(false)}
        onLog={(reason) => {
          onLogDistraction(habit.id, reason);
          setShowDistractionDialog(false);
        }}
        habitName={habit.name}
      />
    </>
  );
};

export default HabitItem;
