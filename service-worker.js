self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("fuga-presidio-cache").then((cache) => {
      return cache.addAll([
        "/Fuga-do-pres-dio/",
        "/Fuga-do-pres-dio/index.html",
        "/Fuga-do-pres-dio/icone-192.png",
        "/Fuga-do-pres-dio/icone-512.png",
        "/Fuga-do-pres-dio/manifest.json",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
