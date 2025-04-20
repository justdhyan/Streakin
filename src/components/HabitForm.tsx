
import { useState } from "react";
import { Habit, HabitIcon } from "@/types/habit";
import { Calendar, Bell, Star, CircleCheck, CirclePlus, ListCheck as Progress, Edit, Repeat, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface HabitFormProps {
  onSave: (habit: Habit) => void;
  onCancel: () => void;
  existingHabit?: Habit;
}

const colorOptions = [
  "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"
];

const iconOptions: HabitIcon[] = [
  "star", "circle-check", "circle-plus", "progress", "calendar", "bell", "repeat", "edit"
];

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

const HabitForm = ({ onSave, onCancel, existingHabit }: HabitFormProps) => {
  const [name, setName] = useState(existingHabit?.name || "");
  const [icon, setIcon] = useState<HabitIcon>(existingHabit?.icon || "star");
  const [color, setColor] = useState(existingHabit?.color || "blue");
  const [remindTime, setRemindTime] = useState(existingHabit?.remindTime || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    const habit: Habit = {
      id: existingHabit?.id || uuidv4(),
      name: name.trim(),
      icon,
      color,
      streak: existingHabit?.streak || 0,
      completedDates: existingHabit?.completedDates || [],
      remindTime: remindTime || undefined,
      createdAt: existingHabit?.createdAt || new Date().toISOString(),
      distractions: existingHabit?.distractions || []
    };
    
    onSave(habit);
  };

  return (
    <div className="notion-card p-4 animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {existingHabit ? "Edit habit" : "New habit"}
        </h3>
        <button 
          onClick={onCancel}
          className="p-1 rounded-md hover:bg-secondary"
        >
          <X size={16} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="notion-input"
            placeholder="Exercise for 30 minutes"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Icon</label>
          <div className="grid grid-cols-8 gap-2">
            {iconOptions.map((iconOption) => {
              const IconComponent = iconMap[iconOption];
              return (
                <button
                  key={iconOption}
                  type="button"
                  className={`p-2 rounded-md ${
                    icon === iconOption
                      ? "bg-notion-blue border border-blue-400"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setIcon(iconOption)}
                >
                  <IconComponent size={18} />
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Color</label>
          <div className="grid grid-cols-9 gap-2">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                className={`p-2 rounded-md bg-notion-${colorOption} ${
                  color === colorOption ? "ring-2 ring-habit-900" : ""
                }`}
                onClick={() => setColor(colorOption)}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Daily reminder (optional)</label>
          <div className="flex items-center">
            <Bell size={16} className="mr-2 text-muted-foreground" />
            <input
              type="time"
              className="notion-input"
              value={remindTime}
              onChange={(e) => setRemindTime(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="notion-button bg-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="notion-button bg-habit-900 text-white hover:bg-habit-800"
            disabled={!name.trim()}
          >
            {existingHabit ? "Save changes" : "Create habit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
