export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(err => console.error("Service worker registration failed", err));
  } else {
    console.log("Service worker not supported");
  }
}
