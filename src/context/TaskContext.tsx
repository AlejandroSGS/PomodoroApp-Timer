import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import { taskReducer, initialTaskState } from '../reducers/task-reducer';
import type { TaskState, TaskAction } from '../types';

type TaskContextType = {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'pomodoro-tasks';

export const TaskProvider = ({ children }: TaskProviderProps) => {
  // Cargar estado inicial desde LocalStorage
  const loadInitialState = (): TaskState => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
    return initialTaskState;
  };

  const [state, dispatch] = useReducer(taskReducer, initialTaskState, loadInitialState);

  // Guardar en LocalStorage cada vez que cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};