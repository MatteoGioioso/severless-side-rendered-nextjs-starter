importScripts("sw-dynamic-assets.js");
importScripts("idb.js");

const SW_VERSION = "c3e1b809e59cca4eb333b0e3dd27f2d7";

const STATIC_CACHE = "static-cache";
const CACHE_MAX_AGE_DAYS = 7;
const appShellFiles = [
  "/",
  "/idb.js",
  "/sw-dynamic-assets.js",
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
  "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.4.1/es5-shim.js",
  "https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.1/es6-shim.js",
  "/static/images/icons/favicon-32x32.png",
  "/static/images/icons/icon-144x144.png",
  "/static/manifest.json"
];

function DB() {
  return idb.open("json-cache", 1, function(db) {
    if (!db.objectStoreNames.contains("posts")) {
      db.createObjectStore("posts", { keyPath: "requestUrl" });
    }
  });
}

function writeData(st, data) {
  return DB().then(function(db) {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.put(data);
    return tx.complete;
  });
}

function readAllData(st) {
  return DB().then(function(db) {
    const tx = db.transaction(st, "readonly");
    const store = tx.objectStore(st);
    return store.getAll();
  });
}

function clearAllData(st) {
  return DB().then(function(db) {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.clear();
    return tx.complete;
  });
}

function deleteItemFromData(st, id) {
  DB()
    .then(function(db) {
      const tx = db.transaction(st, "readwrite");
      const store = tx.objectStore(st);
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      console.log("Item deleted!");
    });
}

function matchUrl(url, lists) {
  return lists.some(item => url.indexOf(item) > -1);
}

function isCacheExpired(cachedAt) {
  const daysDifference = Math.round(
    (new Date() - cachedAt) / (1000 * 60 * 60 * 24)
  );
  console.log(daysDifference);
  return daysDifference >= CACHE_MAX_AGE_DAYS;
}

self.addEventListener("install", event => {
  console.log("Installing service worker  ");

  event.waitUntil(
    caches.delete(STATIC_CACHE).then(() => {
      idb.delete("json-cache");
      console.log("purging cache");
      caches.open(STATIC_CACHE).then(cache => {
        cache
          .addAll([...appShellFiles, ...dynamicAssets])
          .then(() => console.log("cached new static assets"));
      });
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Activate service worker  ");

  return self.clients.claim();
});

self.addEventListener("fetch", async event => {
  const postsUrl =
    "https://cdn.contentful.com/spaces/7hsopb1nqbwn/environments/master/entries?content_type=post";

  const handleAssetsResponse = () =>
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    });

  const handlePostsImages = async () => {
    const response = await caches.match(event.request);

    if (response) {
      return response;
    } else {
      const cache = await caches.open(STATIC_CACHE);
      await cache.add(event.request.url);

      return fetch(event.request);
    }
  };

  const handlePostsResponse = async () => {
    const postsByRequest = (await readAllData("posts")).find(
      postByRequest => postByRequest.requestUrl === postsUrl
    );

    if (postsByRequest && !isCacheExpired(postsByRequest.cachedAt)) {
      const init = { status: 200, statusText: "from cache" };
      return new Response(JSON.stringify(postsByRequest), init);
    } else {
      fetch(event.request).then(async res => {
        const clonedRes = res.clone();
        const json = await clonedRes.json();

        await writeData("posts", {
          requestUrl: postsUrl,
          ...json,
          cachedAt: new Date()
        });

        return res;
      });
    }
  };

  if (matchUrl(event.request.url, [postsUrl])) {
    event.respondWith(handlePostsResponse());
  } else if (matchUrl(event.request.url, ["jpg", "webp", "png"])) {
    event.respondWith(handlePostsImages());
  } else {
    event.respondWith(handleAssetsResponse());
  }
});

self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
