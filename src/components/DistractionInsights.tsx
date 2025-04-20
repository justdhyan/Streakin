
import { Habit } from "@/types/habit";
import { Info } from "lucide-react";

interface DistractionInsightsProps {
  habits: Habit[];
}

const DistractionInsights = ({ habits }: DistractionInsightsProps) => {
  const validHabits = habits?.filter(habit => habit && habit.distractions) || [];
  
  const allDistractions = validHabits.flatMap(h => 
    h.distractions.map(d => ({ ...d, habitName: h.name }))
  );

  if (allDistractions.length === 0) {
    return null;
  }

  const distractionCounts = allDistractions.reduce((acc, curr) => {
    acc[curr.reason] = (acc[curr.reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedDistractions = Object.entries(distractionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const strategies = {
    "Phone distraction": "Try putting your phone in another room during habit time",
    "Procrastination": "Break your habit into smaller, more manageable steps",
    "Too tired": "Consider scheduling this habit earlier in the day",
    "Netflix/TV": "Set specific TV time outside of your habit schedule",
    "Social media": "Use app blockers during your dedicated habit time",
    "Lost track of time": "Set specific reminders or alarms for your habits"
  };

  return (
    <div className="notion-card p-4 mb-6 animate-fade-in">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <Info size={16} />
        Distraction Insights
      </h3>
      
      <div className="space-y-3">
        {sortedDistractions.map(([reason, count]) => (
          <div key={reason} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{reason}</span>
              <span className="text-muted-foreground">{count}x</span>
            </div>
            {strategies[reason as keyof typeof strategies] && (
              <p className="text-xs text-muted-foreground pl-4 border-l-2 border-habit-300">
                Tip: {strategies[reason as keyof typeof strategies]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistractionInsights;
