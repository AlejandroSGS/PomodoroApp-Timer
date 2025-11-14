import { useEffect, useRef, useState } from 'react';
import { usePomodoro } from '../../hooks/usePomodoro';
import { useNotification } from '../../hooks/useNotification';
import { useSound } from '../../hooks/useSound';
import { ActiveTaskSelector } from '../Tasks/ActivateTaskSelector';
import { useTask } from '../../hooks/useTaks';


export const Timer = () => {
  const { state, dispatch } = usePomodoro();
  const { dispatch: taskDispatch } = useTask();
  const { showNotification } = useNotification();
  const { playBeep } = useSound();
  
  // Estado para la tarea activa
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  
  // useRef para trackear el tiempo anterior
  const prevTimeLeft = useRef(state.timeLeft);
  const prevMode = useRef(state.mode);

  // useEffect para hacer TICK automático cada segundo
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, dispatch]);

  // ⭐ useEffect para detectar cuando el timer llega a 0
  useEffect(() => {
    // Si el tiempo cambió de 1 a 0
    if (prevTimeLeft.current === 1 && state.timeLeft === 0) {
      playBeep(); // Reproducir sonido
      
      // Si terminó un periodo de TRABAJO y hay una tarea activa
      if (prevMode.current === 'work' && activeTaskId) {
        // Incrementar el pomodoro de la tarea
        taskDispatch({ type: 'INCREMENT_POMODORO', payload: activeTaskId });
        
        showNotification(
          '¡Pomodoro completado! 🎉',
          'Se agregó un pomodoro a tu tarea'
        );
      } else if (prevMode.current === 'work') {
        showNotification(
          '¡Pomodoro completado! 🎉',
          'Tiempo de tomar un descanso'
        );
      } else {
        showNotification(
          '¡Descanso terminado! 💪',
          'Hora de volver al trabajo'
        );
      }
    }
    
    // Actualizar los refs
    prevTimeLeft.current = state.timeLeft;
    prevMode.current = state.mode;
  }, [state.timeLeft, state.mode, activeTaskId, playBeep, showNotification, taskDispatch]);

  // Función para formatear tiempo
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Función para obtener el título según el modo
  const getModeTitle = () => {
    switch (state.mode) {
      case 'work':
        return 'Tiempo de Trabajo';
      case 'shortBreak':
        return 'Descanso Corto';
      case 'longBreak':
        return 'Descanso Largo';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Display del tiempo */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {getModeTitle()}
        </h2>
        
        <div className="text-6xl font-mono font-bold mb-8 text-gray-800">
          {formatTime(state.timeLeft)}
        </div>
        
        <div className="text-gray-600 mb-8">
          Pomodoros completados hoy: {state.pomodorosCompleted}
        </div>
      </div>

      {/* Botones de control */}
      <div className="flex gap-4 justify-center mb-6">
        {!state.isRunning ? (
          <button
            onClick={() => dispatch({ type: 'START' })}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'PAUSE' })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Pausar
          </button>
        )}
        
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Reiniciar
        </button>
      </div>

      {/* Botones de modo */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'work' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.mode === 'work' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Trabajo
        </button>
        <button
          onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'shortBreak' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.mode === 'shortBreak' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Descanso Corto
        </button>
        <button
          onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'longBreak' })}
          className={`px-4 py-2 rounded font-medium transition ${
            state.mode === 'longBreak' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Descanso Largo
        </button>
      </div>

      {/* ⭐ NUEVO: Selector de tarea activa */}
      {state.mode === 'work' && (
        <ActiveTaskSelector
          activeTaskId={activeTaskId}
          onSelectTask={setActiveTaskId}
        />
      )}
    </div>
  );
};