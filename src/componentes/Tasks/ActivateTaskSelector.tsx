import { useTask } from "../../hooks/useTaks";
import { usePomodoro } from "../../hooks/usePomodoro";

type ActiveTaskSelectorProps = {
  activeTaskId: string | null;
  onSelectTask: (taskId: string | null) => void;
};

export const ActiveTaskSelector = ({ activeTaskId, onSelectTask }: ActiveTaskSelectorProps) => {
  const { state } = useTask();
  const { state: pomodoroState } = usePomodoro();

  // Solo mostrar tareas no completadas
  const activeTasks = state.tasks.filter(task => !task.completed);

  if (activeTasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        ¿En qué tarea estás trabajando?
      </label>
      <select
        value={activeTaskId || ''}
        onChange={(e) => onSelectTask(e.target.value || null)}
        disabled={pomodoroState.isRunning}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        <option value="">Ninguna (solo temporizador)</option>
        {activeTasks.map(task => (
          <option key={task.id} value={task.id}>
            {task.title} ({task.completedPomodoros}/{task.estimatedPomodoros} 🍅)
          </option>
        ))}
      </select>
      
      {activeTaskId && (
        <p className="mt-2 text-sm text-gray-600">
          Al completar este pomodoro, se sumará a esta tarea
        </p>
      )}
    </div>
  );
};