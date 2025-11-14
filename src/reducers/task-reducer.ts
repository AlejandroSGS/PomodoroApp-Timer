import type { TaskState, TaskAction } from '../types';

export const initialTaskState: TaskState = {
  tasks: [],
  filter: 'all',
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'INCREMENT_POMODORO':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

      case 'CLEAR_COMPLETED':
  return {
    ...state,
    tasks: state.tasks.filter(task => !task.completed),
  };

    default:
      return state;
  }
};