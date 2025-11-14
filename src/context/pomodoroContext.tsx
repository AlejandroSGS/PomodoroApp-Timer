import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
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

export const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};