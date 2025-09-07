const CACHE = 'bible-v1';

// Přidej sem všechny soubory, které chceš mít offline:
const ASSETS = [
  './',               // kořen složky (dlouhodobě drží index nebo auto-index)
  './index.html',     // pokud máš index.html (ponech klidně i když máš bible.html)
  './index.html',     // pokud se soubor jmenuje bible.html
  // obrázky použité v projektu:
  './1vchod.png',
  './3VIP.png',
  './2VIP.png',
  './4stred.png',
  './5wc.png',
  './6schodygt.png',
  './7gt.png',
  './8dolni.png',
  './9velky.png',
  './10pasaz.png',
  './11maly.png',
  './12mycka.png',
  './13kuchyn.png',
  './rozvadecwc.png',
  // manifest (nepovinné, ale neuškodí)
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

