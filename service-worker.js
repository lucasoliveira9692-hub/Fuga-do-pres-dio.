/* Minimal service worker - keeps behavior simple and avoids aggressive caching */
self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  self.clients.claim();
});
self.addEventListener('fetch', function(e){
  // fallback to network-first: try network, else cache (but we don't pre-cache)
  e.respondWith(fetch(e.request).catch(function(){ return caches.match(e.request); }));
});
