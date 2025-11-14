import { usePomodoro } from "../../hooks/usePomodoro";
import { useTask } from "../../hooks/useTaks";

export const Stats = () => {
  const { state: pomodoroState } = usePomodoro();
  const { state: taskState } = useTask();

  // Calcular estadísticas
  const totalTasks = taskState.tasks.length;
  const completedTasks = taskState.tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  
  // Pomodoros de la semana
  const getWeekPomodoros = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return pomodoroState.history
      .filter(session => new Date(session.date) >= weekAgo)
      .reduce((sum, session) => sum + session.count, 0);
  };

  // Pomodoros del mes
  const getMonthPomodoros = () => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    return pomodoroState.history
      .filter(session => new Date(session.date) >= monthAgo)
      .reduce((sum, session) => sum + session.count, 0);
  };

  // Tiempo total enfocado (en horas)
  const getTotalFocusTime = () => {
    const totalPomodoros = pomodoroState.pomodorosCompleted;
    const minutes = totalPomodoros * pomodoroState.settings.workDuration;
    return (minutes / 60).toFixed(1);
  };

  // Promedio de pomodoros por día (última semana)
  const getAveragePerDay = () => {
    const weekPomodoros = getWeekPomodoros();
    return (weekPomodoros / 7).toFixed(1);
  };

  // Mejor día (más pomodoros)
  const getBestDay = () => {
    if (pomodoroState.history.length === 0) return null;
    
    const best = pomodoroState.history.reduce((max, session) =>
      session.count > max.count ? session : max
    );
    
    return best;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const bestDay = getBestDay();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Estadísticas</h2>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Hoy */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600">
            {pomodoroState.dailyPomodoros}
          </div>
          <div className="text-sm text-gray-600">Pomodoros hoy</div>
        </div>

        {/* Semana */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-600">
            {getWeekPomodoros()}
          </div>
          <div className="text-sm text-gray-600">Esta semana</div>
        </div>

        {/* Mes */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-600">
            {getMonthPomodoros()}
          </div>
          <div className="text-sm text-gray-600">Este mes</div>
        </div>

        {/* Total */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600">
            {pomodoroState.pomodorosCompleted}
          </div>
          <div className="text-sm text-gray-600">Total histórico</div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">⏱️ Tiempo total enfocado</span>
          <span className="font-bold text-gray-800">{getTotalFocusTime()}h</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">📈 Promedio por día (7 días)</span>
          <span className="font-bold text-gray-800">{getAveragePerDay()} 🍅</span>
        </div>

        {bestDay && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">🏆 Mejor día</span>
            <span className="font-bold text-gray-800">
              {formatDate(bestDay.date)} ({bestDay.count} 🍅)
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-600">✅ Tareas completadas</span>
          <span className="font-bold text-gray-800">
            {completedTasks}/{totalTasks}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">📝 Tareas activas</span>
          <span className="font-bold text-gray-800">{activeTasks}</span>
        </div>
      </div>

      {/* Historial reciente (últimos 7 días) */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Últimos 7 días</h3>
        <div className="flex gap-2">
          {pomodoroState.history
            .slice(-7)
            .map(session => (
              <div
                key={session.date}
                className="flex-1 bg-gray-100 rounded p-2 text-center"
              >
                <div className="text-xs text-gray-600">
                  {formatDate(session.date)}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {session.count}
                </div>
              </div>
            ))}
        </div>
        {pomodoroState.history.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            Completa tu primer pomodoro para ver el historial
          </p>
        )}
      </div>
    </div>
  );
};