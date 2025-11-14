import { useState } from 'react';
import { useTask } from '../../hooks/useTaks';

export const TaskForm = () => {
  const { dispatch } = useTask();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: title.trim(),
        priority,
        estimatedPomodoros,
        completed: false,
        completedPomodoros: 0,
      },
    });

    // Limpiar formulario
    setTitle('');
    setPriority('medium');
    setEstimatedPomodoros(1);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Agregar Tarea</h2>
      
      {/* Input de título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Título de la tarea
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Estudiar React Context"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Select de prioridad */}
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
          Prioridad
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {/* Input de pomodoros estimados */}
      <div className="mb-4">
        <label htmlFor="pomodoros" className="block text-sm font-medium text-gray-700 mb-2">
          Pomodoros estimados
        </label>
        <input
          type="number"
          id="pomodoros"
          min="1"
          max="20"
          value={estimatedPomodoros}
          onChange={(e) => setEstimatedPomodoros(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Agregar Tarea
      </button>
    </form>
  );
};