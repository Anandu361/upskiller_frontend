import React, { createContext, useContext, useState } from 'react';

const UserStatsContext = createContext();

export function UserStatsProvider({ children }) {
  const [stats, setStats] = useState({
    milestones: { current: 0, total: 10 },
    tasksCompleted: 0,
    coursesCompleted: 0,
    hoursSpent: 0,
    achievements: 0,
    learningStreak: 0,
    courses: []
  });

  const resetStats = () => {
    setStats({
      milestones: { current: 0, total: 10 },
      tasksCompleted: 0,
      coursesCompleted: 0,
      hoursSpent: 0,
      achievements: 0,
      learningStreak: 0,
      courses: []
    });
  };

  return (
    <UserStatsContext.Provider value={{ stats, setStats, resetStats }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  return useContext(UserStatsContext);
} 