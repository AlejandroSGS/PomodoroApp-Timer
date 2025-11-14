import { useTask } from "../../hooks/useTaks";

export const TaskList = () => {
  const { state, dispatch } = useTask();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return '';
    }
  };

  // Filtrar tareas según el filtro activo
  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'active') return !task.completed;
    if (state.filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mis Tareas</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {state.tasks.filter(t => !t.completed).length} pendientes
          </span>
          {state.tasks.filter(t => t.completed).length > 0 && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition"
            >
              Limpiar completadas
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.filter === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Activas
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.filter === 'completed'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completadas
        </button>
      </div>

      {/* Lista de tareas */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay tareas {state.filter === 'all' ? '' : state.filter === 'active' ? 'activas' : 'completadas'}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-lg ${getPriorityColor(task.priority)} ${
                task.completed ? 'bg-gray-100' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                  className="mt-1 w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />

                {/* Contenido de la tarea */}
                <div className="flex-1">
                  <h3
                    className={`font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h3>
                  
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span className="font-medium">
                      Prioridad: {getPriorityText(task.priority)}
                    </span>
                    <span>
                      🍅 {task.completedPomodoros}/{task.estimatedPomodoros}
                    </span>
                  </div>
                </div>

                {/* Botón de eliminar */}
                <button
                  onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                  className="text-red-500 hover:text-red-700 font-bold transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};