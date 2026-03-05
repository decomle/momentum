self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  // For MVP, just let network handle everything
  console.log("Networking: Offline is not supported at this stage")
});