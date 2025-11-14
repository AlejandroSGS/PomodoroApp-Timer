import { useEffect } from 'react';

export const useNotification = () => {
  // Pedir permiso para notificaciones cuando se monta el componente
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '🍅', // Puedes cambiar esto por una ruta a un icono
      });
    }
  };

  return { showNotification };
};