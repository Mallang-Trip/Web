const CACHE_NAME = "pwa-task-manager";
const urlsToCache = ["/"];

// install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// activate event
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return (
        r ||
        fetch(e.request).then(async (response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
