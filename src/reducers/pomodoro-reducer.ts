import type { PomodoroState, PomodoroAction, TimerMode } from '../types';

export const initialState: PomodoroState = {
  mode: 'work',
  timeLeft: 25 * 60,
  isRunning: false,
  pomodorosCompleted: 0,
  dailyPomodoros: 0, // ← AGREGAR
  history: [], // ← AGREGAR
  settings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  },
};

export const pomodoroReducer = (
  state: PomodoroState,
  action: PomodoroAction
): PomodoroState => {
  switch (action.type) {
    case 'TICK':
      if (state.timeLeft <= 1) {
        if (state.mode === 'work') {
          return pomodoroReducer(state, { type: 'COMPLETE_POMODORO' });
        }
        
        return {
          ...state,
          timeLeft: 0,
          isRunning: false
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      };
      
    case 'START':
      if (state.timeLeft === 0) {
        const duration = state.mode === 'work'
          ? state.settings.workDuration
          : state.mode === 'shortBreak'
          ? state.settings.shortBreakDuration
          : state.settings.longBreakDuration;
        
        return {
          ...state,
          timeLeft: duration * 60,
          isRunning: true
        };
      }
      return {
        ...state,
        isRunning: true
      };
      
    case 'PAUSE':
      return {
        ...state,
        isRunning: false
      };
      
    case 'RESET':
      const resetDuration = state.mode === 'work'
        ? state.settings.workDuration
        : state.mode === 'shortBreak'
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;
      
      return {
        ...state,
        timeLeft: resetDuration * 60,
        isRunning: false
      };
      
    case 'SWITCH_MODE':
      const newDuration = action.payload === 'work'
        ? state.settings.workDuration
        : action.payload === 'shortBreak'
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;
      
      return {
        ...state,
        mode: action.payload,
        timeLeft: newDuration * 60,
        isRunning: false
      };
      
    case 'COMPLETE_POMODORO':
      const newPomodorosCompleted = state.pomodorosCompleted + 1;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Actualizar historial
      const existingSessionIndex = state.history.findIndex(
        session => session.date === today
      );
      
      let newHistory;
      if (existingSessionIndex !== -1) {
        // Ya existe una sesión hoy, incrementar
        newHistory = state.history.map((session, index) =>
          index === existingSessionIndex
            ? { ...session, count: session.count + 1 }
            : session
        );
      } else {
        // Primera sesión del día
        newHistory = [...state.history, { date: today, count: 1 }];
      }
      
      // Decidir el siguiente modo
      let nextMode: TimerMode;
      if (newPomodorosCompleted % 4 === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
      
      const nextDuration = nextMode === 'longBreak'
        ? state.settings.longBreakDuration
        : state.settings.shortBreakDuration;
      
      return {
        ...state,
        pomodorosCompleted: newPomodorosCompleted,
        dailyPomodoros: state.dailyPomodoros + 1,
        history: newHistory,
        mode: nextMode,
        timeLeft: nextDuration * 60,
        isRunning: false,
      };
    
    case 'RESET_DAILY_COUNT':
      return {
        ...state,
        dailyPomodoros: 0,
      };
      
    default:
      return state;
  }
};