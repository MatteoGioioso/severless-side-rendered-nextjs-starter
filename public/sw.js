self.addEventListener("install", event => {
  console.log("Installing service worker");
});

self.addEventListener("activate", event => {
  console.log("Register service worker");
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  console.log(event)
});
