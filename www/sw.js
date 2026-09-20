// Translation Story Hindi — offline support service worker.
// Strategy: network-first, falling back to cache when offline.
// This means: whenever there's internet, the app always loads the latest
// version straight from the network (so your silent-update workflow via
// Netlify keeps working exactly as before) — and every successful load
// also refreshes what's stored offline. When there's no internet, the app
// falls back to whatever was last successfully cached, so Story reading,
// Vocabulary, Practice, and Games all keep working with no connection.
// Only the embedded YouTube videos and Subscribe button genuinely need
// the internet, since those talk to YouTube's own servers.

const CACHE_NAME = 'tsh-app-cache-v2';
const APP_SHELL_URL = self.registration.scope; // e.g. https://translationstoryhindi.netlify.app/

// Pre-recorded pronunciation clips for Speak It and the Translate game.
// Precached on install so they work offline immediately, not just after
// the first time each one is played while online.
const AUDIO_FILES = [
  'queen-accused-speak-1.mp3',
  'queen-accused-speak-2.mp3',
  'queen-accused-speak-3.mp3',
  'queen-accused-speak-4.mp3',
  'queen-accused-speak-5.mp3',
  'queen-accused-translate-1.mp3',
  'queen-accused-translate-2.mp3',
  'queen-accused-translate-3.mp3',
  'queen-accused-translate-4.mp3',
  'queen-accused-translate-5.mp3',
  'tinu-baya-nest-speak-1.mp3',
  'tinu-baya-nest-speak-2.mp3',
  'tinu-baya-nest-speak-3.mp3',
  'tinu-baya-nest-speak-4.mp3',
  'tinu-baya-nest-speak-5.mp3',
  'tinu-baya-nest-translate-1.mp3',
  'tinu-baya-nest-translate-2.mp3',
  'tinu-baya-nest-translate-3.mp3',
  'tinu-baya-nest-translate-4.mp3',
  'tinu-baya-nest-translate-5.mp3',
  'cobbler-elves-speak-1.mp3',
  'cobbler-elves-speak-2.mp3',
  'cobbler-elves-speak-3.mp3',
  'cobbler-elves-speak-4.mp3',
  'cobbler-elves-speak-5.mp3',
  'cobbler-elves-translate-1.mp3',
  'cobbler-elves-translate-2.mp3',
  'cobbler-elves-translate-3.mp3',
  'cobbler-elves-translate-4.mp3',
  'cobbler-elves-translate-5.mp3',
  'little-tree-speak-1.mp3',
  'little-tree-speak-2.mp3',
  'little-tree-speak-3.mp3',
  'little-tree-speak-4.mp3',
  'little-tree-speak-5.mp3',
  'little-tree-translate-1.mp3',
  'little-tree-translate-2.mp3',
  'little-tree-translate-3.mp3',
  'little-tree-translate-4.mp3',
  'little-tree-translate-5.mp3',
  'four-friends-speak-1.mp3',
  'four-friends-speak-2.mp3',
  'four-friends-speak-3.mp3',
  'four-friends-speak-4.mp3',
  'four-friends-speak-5.mp3',
  'four-friends-translate-1.mp3',
  'four-friends-translate-2.mp3',
  'four-friends-translate-3.mp3',
  'four-friends-translate-4.mp3',
  'four-friends-translate-5.mp3',
  'empty-pot-speak-1.mp3',
  'empty-pot-speak-2.mp3',
  'empty-pot-speak-3.mp3',
  'empty-pot-speak-4.mp3',
  'empty-pot-speak-5.mp3',
  'empty-pot-translate-1.mp3',
  'empty-pot-translate-2.mp3',
  'empty-pot-translate-3.mp3',
  'empty-pot-translate-4.mp3',
  'empty-pot-translate-5.mp3'

];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all([
        fetch(APP_SHELL_URL, { cache: 'no-store' })
          .then((response) => cache.put(APP_SHELL_URL, response))
          .catch(() => { /* offline on first install; nothing to cache yet */ }),
        ...AUDIO_FILES.map((name) =>
          fetch('audio/' + name, { cache: 'no-store' })
            .then((response) => { if (response.ok) cache.put('audio/' + name, response); })
            .catch(() => { /* will be cached lazily on first successful play instead */ })
        )
      ])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only intercept same-origin GET requests (the app's own HTML page).
  // Everything else — YouTube embeds, external links, etc. — passes
  // through untouched, exactly as if this service worker didn't exist.
  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return response;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match(APP_SHELL_URL))
      )
  );
});
