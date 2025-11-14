import { createContext, useReducer, type ReactNode, useEffect } from 'react';
import { pomodoroReducer, initialState } from '../reducers/pomodoro-reducer';
import type { PomodoroState, PomodoroAction } from '../types';

type PomodoroContextType = {
  state: PomodoroState;
  dispatch: React.Dispatch<PomodoroAction>;
};

export const PomodoroContext = createContext<PomodoroContextType | null>(null);

type PomodoroProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'pomodoro-state';

export const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
  // Cargar estado inicial desde LocalStorage
  const loadInitialState = (): PomodoroState => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        
        // Resetear dailyPomodoros si es un nuevo día
        const today = new Date().toISOString().split('T')[0];
        const lastDate = parsed.history[parsed.history.length - 1]?.date;
        
        if (lastDate !== today) {
          parsed.dailyPomodoros = 0;
        }
        
        return { ...initialState, ...parsed, isRunning: false, timeLeft: initialState.timeLeft };
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(pomodoroReducer, initialState, loadInitialState);

  // Guardar en LocalStorage cada vez que cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [state]);

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};