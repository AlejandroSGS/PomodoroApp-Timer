import { useContext } from 'react';
import { PomodoroContext } from '../context/pomodoroContext';

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  
  if (!context) {
    throw new Error('usePomodoro debe usarse dentro de PomodoroProvider');
  }
  
  return context;
};