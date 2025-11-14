export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type PomodoroState = {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  pomodorosCompleted: number;
  dailyPomodoros: number; // ← AGREGAR
  history: PomodoroSession[]; // ← AGREGAR
  settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  };
};

export type PomodoroAction =
  | { type: 'TICK' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SWITCH_MODE'; payload: TimerMode }
  | { type: 'COMPLETE_POMODORO' }
  | { type: 'RESET_DAILY_COUNT' };

  // ... tipos existentes (TimerMode, PomodoroState, PomodoroAction)

// NUEVOS tipos para tareas
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: string;
};

export type TaskState = {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
};

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'INCREMENT_POMODORO'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskState['filter'] }
  | { type: 'CLEAR_COMPLETED' };  // ← NUEVA
  
export type PomodoroSession = {
  date: string; // formato ISO
  count: number;
};
