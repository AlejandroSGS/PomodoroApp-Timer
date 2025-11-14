export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type PomodoroState = {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  pomodorosCompleted: number;
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
  | { type: 'SWITCH_MODE'; payload: TimerMode };