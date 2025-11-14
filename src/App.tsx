import { PomodoroProvider } from "./context/pomodoroContext";
import { Timer } from "./componentes/Timer/Timer";

function App() {
  return (
    <PomodoroProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            🍅 Pomodoro Timer
          </h1>
          <Timer />
        </div>
      </div>
    </PomodoroProvider>
  );
}

export default App;