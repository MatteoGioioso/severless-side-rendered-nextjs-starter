importScripts("sw-dynamic-assets.js");

const STATIC_CACHE = "static-cache";
const appShellFiles = [
  "/",
  "/static/css/skel.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
  "/static/images/banner.jpg",
  "https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500:600:700",
  "https://fonts.gstatic.com/s/worksans/v4/QGYqz_wNahGAdqQ43Rh3H5Drv_0.woff2",
  "https://fonts.gstatic.com/s/worksans/v4/QGYpz_wNahGAdqQ43Rh3j4P8mNhN.woff2",
  "https://fonts.gstatic.com/s/worksans/v4/QGYpz_wNahGAdqQ43Rh314L8mNhN.woff2",
  "https://fonts.gstatic.com/s/worksans/v4/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
  "https://cdn.jsdelivr.net/npm/intersection-observer-polyfill@0.1.0/dist/IntersectionObserver.js",
  "/static/images/icons/favicon-32x32.png",
  "/static/images/icons/icon-144x144.png",
  "/static/manifest.json"
];

self.addEventListener("install", event => {
  console.log("Installing service worker");

  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log(dynamicAssets)
      console.log("Precaching");
      cache
        .addAll([...appShellFiles, ...dynamicAssets])
        .then(() => console.log("cached"));
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Register service worker");

  //TODO: test this again
  event.waitUntil(
    caches.delete(STATIC_CACHE).then(() => {
      console.log("cache purged");
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});
