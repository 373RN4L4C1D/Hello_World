{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red109\green115\blue120;\red23\green24\blue24;\red202\green202\blue202;
\red183\green111\blue247;\red54\green192\blue160;\red212\green212\blue212;\red113\green192\blue131;}
{\*\expandedcolortbl;;\cssrgb\c50196\c52549\c54510;\cssrgb\c11765\c12157\c12549;\cssrgb\c83137\c83137\c83137;
\cssrgb\c77255\c54118\c97647;\cssrgb\c23922\c78824\c69020;\cssrgb\c86275\c86275\c86275;\cssrgb\c50588\c78824\c58431;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 /**\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2  * @file service-worker.js\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2  * @description The Service Worker for the Hello World PWA.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2  * This script runs in the background to provide offline capabilities.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2  */\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 // A name for our cache, which is a storage for our app's files.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 // Versioning the cache helps in managing updates.\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 CACHE_NAME\cf4 \strokec4  \cf7 \strokec7 =\cf4 \strokec4  \cf8 \strokec8 'hello-world-pwa-v1'\cf7 \strokec7 ;\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 // A list of all the files (the "app shell") that we want to cache.\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  urlsToCache \cf7 \strokec7 =\cf4 \strokec4  \cf7 \strokec7 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf8 \strokec8 '.'\cf7 \strokec7 ,\cf4 \strokec4  \cf2 \strokec2 // This represents the root path, which loads our main HTML file.\cf4 \cb1 \strokec4 \
\cb3   \cf8 \strokec8 'manifest.json'\cf7 \strokec7 ,\cf4 \strokec4  \cf2 \strokec2 // The app manifest file.\cf4 \cb1 \strokec4 \
\cb3   \cf8 \strokec8 'https://cdn.tailwindcss.com'\cf7 \strokec7 ,\cf4 \strokec4  \cf2 \strokec2 // The CSS framework.\cf4 \cb1 \strokec4 \
\cb3   \cf8 \strokec8 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'\cf7 \strokec7 ,\cf4 \strokec4  \cf2 \strokec2 // The font file.\cf4 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 // We also cache the icons defined in the manifest.\cf4 \cb1 \strokec4 \
\cb3   \cf8 \strokec8 'https://placehold.co/192x192/1f2937/10b981?text=HW'\cf7 \strokec7 ,\cf4 \cb1 \strokec4 \
\cb3   \cf8 \strokec8 'https://placehold.co/512x512/1f2937/10b981?text=HW'\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 // --- INSTALL Event ---\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 // This event fires when the service worker is first installed.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 // We use this opportunity to open our cache and add the app shell files to it.\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 self\cf7 \strokec7 .\cf4 \strokec4 addEventListener\cf7 \strokec7 (\cf8 \strokec8 'install'\cf7 \strokec7 ,\cf4 \strokec4  \cf7 \strokec7 (\cf4 \strokec4 event\cf7 \strokec7 )\cf4 \strokec4  \cf7 \strokec7 =>\cf4 \strokec4  \cf7 \strokec7 \{\cf4 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 // We use event.waitUntil to ensure the service worker doesn't\cf4 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 // move on from the install phase until it has finished its work.\cf4 \cb1 \strokec4 \
\cb3   event\cf7 \strokec7 .\cf4 \strokec4 waitUntil\cf7 \strokec7 (\cf4 \cb1 \strokec4 \
\cb3     caches\cf7 \strokec7 .\cf4 \strokec4 open\cf7 \strokec7 (\cf6 \strokec6 CACHE_NAME\cf7 \strokec7 )\cf4 \cb1 \strokec4 \
\cb3       \cf7 \strokec7 .\cf4 \strokec4 then\cf7 \strokec7 ((\cf4 \strokec4 cache\cf7 \strokec7 )\cf4 \strokec4  \cf7 \strokec7 =>\cf4 \strokec4  \cf7 \strokec7 \{\cf4 \cb1 \strokec4 \
\cb3         console\cf7 \strokec7 .\cf4 \strokec4 log\cf7 \strokec7 (\cf8 \strokec8 'Opened cache. Caching app shell...'\cf7 \strokec7 );\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 return\cf4 \strokec4  cache\cf7 \strokec7 .\cf4 \strokec4 addAll\cf7 \strokec7 (\cf4 \strokec4 urlsToCache\cf7 \strokec7 );\cf4 \cb1 \strokec4 \
\cb3       \cf7 \strokec7 \})\cf4 \cb1 \strokec4 \
\cb3   \cf7 \strokec7 );\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 \});\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 // --- FETCH Event ---\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 // This event fires every time the PWA makes a network request (e.g., for a file or data).\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 self\cf7 \strokec7 .\cf4 \strokec4 addEventListener\cf7 \strokec7 (\cf8 \strokec8 'fetch'\cf7 \strokec7 ,\cf4 \strokec4  \cf7 \strokec7 (\cf4 \strokec4 event\cf7 \strokec7 )\cf4 \strokec4  \cf7 \strokec7 =>\cf4 \strokec4  \cf7 \strokec7 \{\cf4 \cb1 \strokec4 \
\cb3   event\cf7 \strokec7 .\cf4 \strokec4 respondWith\cf7 \strokec7 (\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 // We check if the requested resource is already in our cache.\cf4 \cb1 \strokec4 \
\cb3     caches\cf7 \strokec7 .\cf4 \strokec4 match\cf7 \strokec7 (\cf4 \strokec4 event\cf7 \strokec7 .\cf4 \strokec4 request\cf7 \strokec7 )\cf4 \cb1 \strokec4 \
\cb3       \cf7 \strokec7 .\cf4 \strokec4 then\cf7 \strokec7 ((\cf4 \strokec4 response\cf7 \strokec7 )\cf4 \strokec4  \cf7 \strokec7 =>\cf4 \strokec4  \cf7 \strokec7 \{\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 // If we found a match in the cache, we return the cached response.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 // This is what enables offline functionality.\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 if\cf4 \strokec4  \cf7 \strokec7 (\cf4 \strokec4 response\cf7 \strokec7 )\cf4 \strokec4  \cf7 \strokec7 \{\cf4 \cb1 \strokec4 \
\cb3           \cf5 \strokec5 return\cf4 \strokec4  response\cf7 \strokec7 ;\cf4 \cb1 \strokec4 \
\cb3         \cf7 \strokec7 \}\cf4 \cb1 \strokec4 \
\
\cb3         \cf2 \strokec2 // If the resource is not in the cache, we make a network request for it as normal.\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 return\cf4 \strokec4  fetch\cf7 \strokec7 (\cf4 \strokec4 event\cf7 \strokec7 .\cf4 \strokec4 request\cf7 \strokec7 );\cf4 \cb1 \strokec4 \
\cb3       \cf7 \strokec7 \})\cf4 \cb1 \strokec4 \
\cb3   \cf7 \strokec7 );\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 \});\cf4 \cb1 \strokec4 \
\
}