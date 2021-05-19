importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/index.html', revision: '383676' },
  {url: '/est_prog/', revision: null},
/*   {url: '/est_prog/estilo.css', revision: null},
  {url: '/est_prog/bootstrap.min.css', revision: null},
  {url: '/est_prog/bootstrap.min.js', revision: null},
  {url: '/est_prog/scripts.js', revision: null},
  {url: '/est_prog/jspdf.min.js', revision: null},
  {url: '/est_prog/sw.js', revision: null}, */
]); 

// Cache JavaScript and CSS
workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' ||
                 request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
)

// Cache Images
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }), 
    ],
  }),
)

/*
workbox.routing.registerRoute( 
  // Cache json locales. 
  /\.json$/, 
  // Use cache but update in the background. 
  new workbox.strategies.StaleWhileRevalidate({ 
    // Use a custom cache name. 
    cacheName: 'json-cache', 
  }),
); */
