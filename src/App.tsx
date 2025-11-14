import { PomodoroProvider } from "./context/pomodoroContext";
import { Timer } from "./componentes/Timer/Timer";
import { TaskProvider } from "./context/TaskContext";
import { TaskForm } from "./componentes/Tasks/TaskForm";
import { TaskList } from "./componentes/Tasks/TaksList";
import { Stats } from "./componentes/Stats/Stats";

function App() {
  return (
    <PomodoroProvider>
      <TaskProvider>
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Pomodoro Timer
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna 1: Timer */}
              <div className="lg:col-span-1">
                <Timer />
                {/* Estadísticas debajo del timer */}
                <div className="mt-6">
                  <Stats />
                </div>
              </div>
              
              {/* Columna 2-3: Tareas */}
              <div className="lg:col-span-2">
                <TaskForm />
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </TaskProvider>
    </PomodoroProvider>
  );
}

export default App;