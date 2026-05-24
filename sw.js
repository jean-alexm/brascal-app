// Service Worker — BRASCAL Notificações
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// Recebe mensagem do app e mostra notificação
self.addEventListener('message', event => {
  if (event.data?.type === 'NOTIFY') {
    const { title, body, tag } = event.data;
    self.registration.showNotification(title, {
      body,
      tag,
      renotify: true,
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: false,
      data: { url: self.location.origin }
    });
  }
});

// Ao tocar na notificação, abre o app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow(event.notification.data?.url || '/');
    })
  );
});
