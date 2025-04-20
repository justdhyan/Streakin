
import { Habit } from "@/types/habit";

export const saveHabits = (habits: Habit[]): void => {
  localStorage.setItem("habits", JSON.stringify(habits));
};

import { getSampleHabits } from "./sampleData";

export const loadHabits = (): Habit[] => {
  const storedHabits = localStorage.getItem("habits");
  
  // If no habits stored, return sample data for first-time users
  if (!storedHabits) {
    const sampleHabits = getSampleHabits();
    saveHabits(sampleHabits);
    return sampleHabits;
  }
  
  return JSON.parse(storedHabits);
};

export const registerNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    return false;
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
  
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  
  return false;
};

export const scheduleNotification = (habit: Habit): void => {
  if (!habit.remindTime || !("Notification" in window)) return;
  
  const [hours, minutes] = habit.remindTime.split(":").map(Number);
  
  const now = new Date();
  const notificationTime = new Date();
  
  notificationTime.setHours(hours, minutes, 0);
  
  if (notificationTime < now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }
  
  const timeUntilNotification = notificationTime.getTime() - now.getTime();
  
  const timeoutId = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification(`Time for: ${habit.name}`, {
        body: "Don't break your streak!",
        icon: "/favicon.ico"
      });
      
      scheduleNotification(habit);
    }
  }, timeUntilNotification);
  
  const timeouts = JSON.parse(localStorage.getItem("notificationTimeouts") || "{}");
  timeouts[habit.id] = timeoutId;
  localStorage.setItem("notificationTimeouts", JSON.stringify(timeouts));
};

export const clearNotification = (habitId: string): void => {
  const timeouts = JSON.parse(localStorage.getItem("notificationTimeouts") || "{}");
  
  if (timeouts[habitId]) {
    clearTimeout(timeouts[habitId]);
    delete timeouts[habitId];
    localStorage.setItem("notificationTimeouts", JSON.stringify(timeouts));
  }
};
