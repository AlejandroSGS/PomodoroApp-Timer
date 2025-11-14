import type { PomodoroState, PomodoroAction } from '../types';

export const initialState: PomodoroState = {
  mode: 'work',
  timeLeft: 25 * 60,
  isRunning: false,
  pomodorosCompleted: 0,
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
      
    default:
      return state;
  }
};