import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import HabitItem from "@/components/HabitItem";
import HabitForm from "@/components/HabitForm";
import StreakDisplay from "@/components/StreakDisplay";
import HabitStats from "@/components/HabitStats";
import DistractionInsights from "@/components/DistractionInsights";
import { Habit } from "@/types/habit";
import { 
  loadHabits, 
  saveHabits,
  registerNotificationPermission,
  scheduleNotification,
  clearNotification 
} from "@/utils/localStorageUtils";

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);
  const [notificationPermission, setNotificationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const storedHabits = loadHabits();
    setHabits(storedHabits);
    
    registerNotificationPermission().then(setNotificationPermission);
    
    storedHabits.forEach(habit => {
      if (habit.remindTime) {
        scheduleNotification(habit);
      }
    });
  }, []);

  const handleAddHabit = () => {
    setEditingHabit(undefined);
    setShowForm(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleSaveHabit = (habit: Habit) => {
    let updatedHabits: Habit[];
    
    if (editingHabit) {
      updatedHabits = habits.map(h => h.id === habit.id ? habit : h);
      
      if (editingHabit.remindTime !== habit.remindTime) {
        clearNotification(habit.id);
        if (habit.remindTime) {
          scheduleNotification(habit);
        }
      }
    } else {
      updatedHabits = [...habits, habit];
      
      if (habit.remindTime && notificationPermission) {
        scheduleNotification(habit);
      }
    }
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setShowForm(false);
  };

  const handleCompleteHabit = (habitId: string) => {
    const today = new Date().toISOString().split("T")[0];
    
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = [...habit.completedDates];
        const todayIndex = completedDates.indexOf(today);
        
        if (todayIndex >= 0) {
          completedDates.splice(todayIndex, 1);
          return {
            ...habit,
            completedDates,
            streak: Math.max(0, habit.streak - 1)
          };
        } else {
          completedDates.push(today);
          return {
            ...habit,
            completedDates,
            streak: habit.streak + 1
          };
        }
      }
      return habit;
    });
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHabit(undefined);
  };

  const handleLogDistraction = (habitId: string, reason: string) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          distractions: [
            ...habit.distractions,
            { date: today, reason, habitId }
          ]
        };
      }
      return habit;
    });
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      <div className="container max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Streakin</h1>
            <p className="text-muted-foreground text-lg">Streak it till you make it.</p>
          </div>
          <ThemeToggle />
        </div>
        
        {habits.length > 0 && <HabitStats habits={habits} />}
        
        <DistractionInsights habits={habits} />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Habits</h2>
          <button 
            className="notion-button flex items-center gap-1.5 bg-habit-900 text-white hover:bg-habit-800 transition-all duration-200"
            onClick={handleAddHabit}
          >
            <Plus size={16} />
            <span>Add habit</span>
          </button>
        </div>
        
        {showForm ? (
          <div className="mb-8">
            <HabitForm 
              onSave={handleSaveHabit}
              onCancel={handleCancelForm}
              existingHabit={editingHabit}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {habits.length === 0 ? (
              <div className="notion-card p-8 flex flex-col items-center text-center animate-fade-in">
                <p className="text-muted-foreground mb-4">
                  Start building better habits today
                </p>
                <button 
                  className="notion-button flex items-center gap-1.5"
                  onClick={handleAddHabit}
                >
                  <Plus size={16} />
                  <span>Create your first habit</span>
                </button>
              </div>
            ) : (
              habits.map(habit => (
                <div key={habit.id} className="space-y-1">
                  <HabitItem 
                    habit={habit}
                    onComplete={handleCompleteHabit}
                    onEdit={handleEditHabit}
                    onLogDistraction={handleLogDistraction}
                  />
                  <StreakDisplay habit={habit} />
                </div>
              ))
            )}
          </div>
        )}
        
        {notificationPermission === false && (
          <div className="mt-8 p-4 bg-notion-yellow rounded-md text-sm animate-fade-in">
            <p>Enable notifications to get reminders for your habits</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
