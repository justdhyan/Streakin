
import { Habit } from "@/types/habit";
import { v4 as uuidv4 } from "uuid";

export const getSampleHabits = (): Habit[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  return [
    {
      id: uuidv4(),
      name: "Morning meditation",
      icon: "star",
      color: "purple",
      streak: 3,
      completedDates: [
        formatDate(twoDaysAgo),
        formatDate(yesterday),
        formatDate(today)
      ],
      remindTime: "08:00",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      distractions: []
    },
    {
      id: uuidv4(),
      name: "Read for 20 minutes",
      icon: "circle-check",
      color: "blue",
      streak: 2,
      completedDates: [
        formatDate(yesterday),
        formatDate(today)
      ],
      remindTime: "21:30",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      distractions: []
    },
    {
      id: uuidv4(),
      name: "Drink water (2L)",
      icon: "repeat",
      color: "green",
      streak: 0,
      completedDates: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
      distractions: []
    }
  ];
};
