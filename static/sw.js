self.addEventListener("install", event => {
  console.log("Installing service worker", event);
});

self.addEventListener("activate", event => {
  console.log("Register service worker", event);
  return self.clients.claim();
});
