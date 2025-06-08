/**
 * @file service-worker.js
 * @description The Service Worker for the Hello World PWA.
 * This script runs in the background to provide offline capabilities.
 */

// A name for our cache, which is a storage for our app's files.
// Versioning the cache helps in managing updates.
const CACHE_NAME = 'hello-world-pwa-v1';

// A list of all the files (the "app shell") that we want to cache.
const urlsToCache = [
  '.', // This represents the root path, which loads our main HTML file.
  'manifest.json', // The app manifest file.
  'https://cdn.tailwindcss.com', // The CSS framework.
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap', // The font file.
  // We also cache the icons defined in the manifest.
  'https://placehold.co/192x192/1f2937/10b981?text=HW',
  'https://placehold.co/512x512/1f2937/10b981?text=HW'
];

// --- INSTALL Event ---
// This event fires when the service worker is first installed.
// We use this opportunity to open our cache and add the app shell files to it.
self.addEventListener('install', (event) => {
  // We use event.waitUntil to ensure the service worker doesn't
  // move on from the install phase until it has finished its work.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache. Caching app shell...');
        return cache.addAll(urlsToCache);
      })
  );
});

// --- FETCH Event ---
// This event fires every time the PWA makes a network request (e.g., for a file or data).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // We check if the requested resource is already in our cache.
    caches.match(event.request)
      .then((response) => {
        // If we found a match in the cache, we return the cached response.
        // This is what enables offline functionality.
        if (response) {
          return response;
        }

        // If the resource is not in the cache, we make a network request for it as normal.
        return fetch(event.request);
      })
  );
});

