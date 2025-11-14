# 🍅 Pomodoro Timer App

Una aplicación web moderna de **Pomodoro Timer** construida con **React**, **TypeScript** y **Vite**, que combina gestión de tiempo con gestión de tareas. Incluye estadísticas detalladas, persistencia en localStorage y una interfaz intuitiva con **Tailwind CSS**.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Arquitectura](#guía-de-arquitectura)
- [Componentes](#componentes)
- [Context & Reducers](#context--reducers)
- [Hooks Personalizados](#hooks-personalizados)
- [Tipos TypeScript](#tipos-typescript)
- [Configuración](#configuración)

---

## ✨ Características

- ⏱️ **Timer Pomodoro completo**: Sesiones de trabajo, descansos cortos y descansos largos
- ✅ **Gestión de tareas**: Crear, editar, completar y eliminar tareas
- 📊 **Estadísticas**: Visualización de pomodoros completados por día, semana y mes
- 💾 **Persistencia**: Todos los datos se guardan en localStorage
- 🔔 **Notificaciones**: Alertas cuando se completa un pomodoro
- 🔊 **Sonidos**: Beep de confirmación al completar sesiones
- 🎨 **Interfaz moderna**: Diseño responsive con Tailwind CSS
- 📱 **Responsive**: Se adapta a dispositivos móviles, tablets y escritorio
- 🎯 **Prioridades de tareas**: Asigna niveles de prioridad (Alta, Media, Baja)
- 📈 **Estimación de pomodoros**: Estima cuántos pomodoros necesita cada tarea

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/AlejandroSGS/PomodoroApp-Timer.git
cd PomodoroApp-Timer
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173` (o el puerto disponible)

---

## 📜 Scripts Disponibles

```bash
# Desarrollar con hot-reload
npm run dev

# Compilar para producción
npm run build

# Verificar linting
npm run lint

# Ver la versión de producción localmente
npm run preview
```

---

## 📁 Estructura del Proyecto

```
ponodomo-app/
├── src/
│   ├── componentes/
│   │   ├── Settings/          # Configuración del timer
│   │   ├── Stats/             # Componentes de estadísticas
│   │   │   ├── PomodoroChart.tsx
│   │   │   ├── StatsOverview.tsx
│   │   │   ├── WeeklyProgress.tsx
│   │   │   └── Stats.tsx
│   │   ├── Tasks/             # Gestión de tareas
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaksList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaksFilters.tsx
│   │   │   └── ActivateTaskSelector.tsx
│   │   └── Timer/             # Componentes del timer
│   │       ├── Timer.tsx
│   │       ├── TimerControls.tsx
│   │       └── TimerDisplay.tsx
│   ├── context/
│   │   ├── pomodoroContext.tsx
│   │   └── TaskContext.tsx
│   ├── hooks/
│   │   ├── usePomodoro.ts
│   │   ├── useTask.ts
│   │   ├── useNotification.ts
│   │   ├── useSound.ts
│   │   └── useTimer.ts
│   ├── reducers/
│   │   ├── pomodoro-reducer.ts
│   │   └── task-reducer.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── localStorage.ts
│   │   └── time.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md
```

---

## 🏗️ Guía de Arquitectura

### Estado Global (Context API + Reducers)

La aplicación usa **React Context API** con **useReducer** para manejar el estado global:

#### 1. **PomodoroContext**
- Gestiona el estado del timer pomodoro
- Maneja modos (work, shortBreak, longBreak)
- Registra historial de sesiones completadas
- Persiste en localStorage

#### 2. **TaskContext**
- Gestiona la lista de tareas
- Controla filtros (todas, activas, completadas)
- Persiste en localStorage

### Flujo de Datos

```
User Interaction
       ↓
Component dispatch(action)
       ↓
Reducer procesa action
       ↓
Nuevo state
       ↓
useEffect guarda en localStorage
       ↓
Component re-renderiza
```

---

## 🧩 Componentes

### Timer (Columna 1)

**`Timer.tsx`** - Componente principal del timer
- Maneja la lógica de TICK automático cada segundo
- Selecciona tarea activa
- Muestra notificaciones y sonidos

**`TimerDisplay.tsx`** - Visualización del tiempo
- Muestra MM:SS
- Cambio de color según modo
- Indicador visual del modo actual

**`TimerControls.tsx`** - Controles del timer
- Botones: Start, Pause, Reset
- Selector de modo (Work/Short Break/Long Break)

### Tareas (Columna 2-3)

**`TaskForm.tsx`** - Formulario de nueva tarea
- Crear tarea con título, prioridad, estimación

**`TaksList.tsx`** - Lista de tareas
- Filtra según estado (todas/activas/completadas)
- Muestra contador de tareas pendientes

**`TaskItem.tsx`** - Item individual de tarea
- Checkbox para completar
- Botones de acción (eliminar, editar)

**`TaksFilters.tsx`** - Filtros de tareas
- Selector de estado (All/Active/Completed)

**`ActivateTaskSelector.tsx`** - Selector de tarea activa
- Vincula tarea al pomodoro actual

### Estadísticas (Debajo del Timer)

**`Stats.tsx`** - Resumen de estadísticas
- Pomodoros totales del día/semana/mes
- Tareas completadas

**`StatsOverview.tsx`** - Vista general
- Tarjetas con métricas clave

**`PomodoroChart.tsx`** - Gráfico de pomodoros
- Visualización visual de sesiones

**`WeeklyProgress.tsx`** - Progreso semanal
- Desempeño de los últimos 7 días

---

## 🔄 Context & Reducers

### pomodoroContext.tsx

```typescript
export interface PomodoroState {
  mode: 'work' | 'shortBreak' | 'longBreak';
  timeLeft: number; // en segundos
  isRunning: boolean;
  pomodorosCompleted: number;
  dailyPomodoros: number;
  history: PomodoroSession[];
  settings: {
    workDuration: number;      // minutos
    shortBreakDuration: number; // minutos
    longBreakDuration: number;  // minutos
  };
}
```

**Acciones soportadas:**
- `TICK` - Decrementa tiempo cada segundo
- `START` - Inicia el timer
- `PAUSE` - Pausa el timer
- `RESET` - Reinicia el timer actual
- `SWITCH_MODE` - Cambia a otro modo
- `COMPLETE_POMODORO` - Marca pomodoro como completado
- `RESET_DAILY_COUNT` - Reinicia contador diario

### TaskContext

```typescript
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: string;
};

export interface TaskState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}
```

**Acciones soportadas:**
- `ADD_TASK` - Crear nueva tarea
- `TOGGLE_TASK` - Marcar como completada/incompleta
- `DELETE_TASK` - Eliminar tarea
- `INCREMENT_POMODORO` - Incrementar pomodoros de una tarea
- `SET_FILTER` - Cambiar filtro
- `CLEAR_COMPLETED` - Limpiar todas las completadas

---

## 🎣 Hooks Personalizados

### usePomodoro()
Acceso al contexto del pomodoro
```typescript
const { state, dispatch } = usePomodoro();
```

### useTask()
Acceso al contexto de tareas
```typescript
const { state, dispatch } = useTask();
```

### useNotification()
Crear notificaciones del navegador
```typescript
const { showNotification } = useNotification();
showNotification('Pomodoro completado!', {
  icon: '🍅',
  requireInteraction: true
});
```

### useSound()
Reproducir sonidos
```typescript
const { playBeep } = useSound();
playBeep();
```

### useTimer()
Lógica compartida del timer (si aplica)

---

## 📘 Tipos TypeScript

Archivo: `src/types/index.ts`

```typescript
// Tipos principales
export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type PomodoroSession = {
  date: string; // formato ISO (YYYY-MM-DD)
  count: number; // cantidad de pomodoros ese día
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: string;
};

// Estados
export type PomodoroState = { /* ... */ };
export type TaskState = { /* ... */ };

// Acciones
export type PomodoroAction = /* union types */;
export type TaskAction = /* union types */;
```

---

## 💾 Persistencia (localStorage)

### saveToLocalStorage(key, value)
Guarda valor serializado en JSON
```typescript
saveToLocalStorage('pomodoro-state', pomodoroState);
```

### loadFromLocalStorage(key)
Carga valor deserializado
```typescript
const state = loadFromLocalStorage<PomodoroState>('pomodoro-state');
```

### removeFromLocalStorage(key)
Elimina una clave
```typescript
removeFromLocalStorage('pomodoro-state');
```

### clearAllLocalStorage()
Limpia todo localStorage (¡usar con cuidado!)
```typescript
clearAllLocalStorage();
```

---

## ⚙️ Configuración

### Tailwind CSS

Sistema de diseño personalizado con colores y tipografía definidos.

### TypeScript

Archivos de configuración:
- `tsconfig.json` - Configuración base
- `tsconfig.app.json` - Config para aplicación
- `tsconfig.node.json` - Config para herramientas

### Vite

Archivo: `vite.config.ts`
- Plugin React con SWC
- Configuración de alias
- Optimizaciones de build

### ESLint

Archivo: `eslint.config.js`
- Reglas TypeScript
- Reglas React
- Reglas de React Hooks

---

## 🔧 Desarrollo

### Hot Module Replacement (HMR)
Cambios en código se reflejan automáticamente sin perder estado.

### TypeScript Checking
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## 📦 Dependencias Principales

- **react** (^19.2.0) - Librería UI
- **react-dom** (^19.2.0) - Rendering en DOM
- **tailwindcss** (^4.1.17) - Framework CSS
- **vite** (^7.2.2) - Build tool
- **typescript** (^5.9.3) - Type checking

---

## 📝 Convenciones del Proyecto

### Archivos
- Componentes: `NombreComponente.tsx`
- Hooks: `useNombreHook.ts`
- Utilitarios: `nombreUtil.ts`
- Tipos: En `src/types/index.ts`

### Nomenclatura
- Componentes: PascalCase (`Timer.tsx`)
- Funciones/variables: camelCase (`handleClick()`)
- Constantes: UPPER_SNAKE_CASE (`STORAGE_KEY`)
- Props tipo: `NombreComponenteProps`

### Documentación
- JSDoc para funciones públicas
- Comentarios inline para lógica compleja
- README actualizado para cambios mayores

---

## 🐛 Solución de Problemas

### El app no carga
1. Verificar que `npm install` se ejecutó correctamente
2. Revisar la consola del navegador para errores
3. Limpiar localStorage: `localStorage.clear()`

### localStorage no funciona
- Verificar que el navegador permite localStorage
- No funciona en navegación privada/incógnita en algunos navegadores
- Revisar en DevTools → Application → Local Storage

### Sonidos/Notificaciones no funcionan
- Verificar permisos del navegador
- Algunos navegadores requieren interacción del usuario antes de sonidos

---

## 📚 Recursos Útiles

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Técnica Pomodoro](https://es.wikipedia.org/wiki/T%C3%A9cnica_Pomodoro)

---

## 📄 Licencia

Este proyecto es de código abierto.

---

## 👤 Autor

**Alejandro SGS**
- GitHub: [@AlejandroSGS](https://github.com/AlejandroSGS)
- Repositorio: [PomodoroApp-Timer](https://github.com/AlejandroSGS/PomodoroApp-Timer)
