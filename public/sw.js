// Service Worker for PWA
// Version with timestamp to force cache invalidation on updates
const CACHE_VERSION = "portfolio-v3-" + Date.now()
const STATIC_CACHE = "static-" + CACHE_VERSION

const urlsToCache = [
  "/manifest.json",
]

// Install event - cache minimal static resources only
self.addEventListener("install", (event) => {
  // Force immediate activation
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("Cache addAll failed:", err)
      })
    })
  )
})

// Activate event - clean up ALL old caches immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Delete all old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE) {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  )
})

// Fetch event - ALWAYS network first for HTML pages, never cache HTML
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  const url = new URL(event.request.url)
  const request = event.request
  const acceptHeader = request.headers.get("accept") || ""
  
  // Detect HTML pages
  const isHTML = acceptHeader.includes("text/html") || 
                 url.pathname === "/" || 
                 (!url.pathname.includes(".") && !url.pathname.startsWith("/api"))

  if (isHTML) {
    // ALWAYS fetch from network for HTML - NEVER use cache
    event.respondWith(
      fetch(event.request, {
        cache: "no-store",
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        }
      })
        .then((response) => {
          // Return fresh response, don't cache HTML
          return response
        })
        .catch(() => {
          // Only use cache if network completely fails (offline)
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            return new Response("Offline - Please check your connection", { 
              status: 503,
              headers: { "Content-Type": "text/html" }
            })
          })
        })
    )
  } else {
    // For static assets, use cache but always check network in background
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Fetch from network
        const networkFetch = fetch(event.request, {
          cache: "reload"
        }).then((networkResponse) => {
          // Update cache if valid response
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return networkResponse
        }).catch(() => null)

        // Return cached if available, otherwise wait for network
        if (cachedResponse) {
          // Return cached immediately, but update in background
          networkFetch.catch(() => {})
          return cachedResponse
        }
        
        // No cache, wait for network
        return networkFetch.then((response) => {
          if (response) {
            return response
          }
          return new Response("Resource not available", { status: 404 })
        })
      })
    )
  }
})
