// Offline tile cache for OSM map tiles
// v3 — versioned cache, old caches purged on activate, only valid responses cached

const TILE_CACHE = "osm-tiles-v3";
const MAX_TILES = 2000;

// Purge any old-versioned caches when this SW activates
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k.startsWith("osm-tiles-") && k !== TILE_CACHE)
        .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isOsmTile(url) {
  try {
    const host = new URL(url).hostname;
    return host === "tile.openstreetmap.org" ||
           host === "a.tile.openstreetmap.org" ||
           host === "b.tile.openstreetmap.org" ||
           host === "c.tile.openstreetmap.org";
  } catch { return false; }
}

function tileKey(request) {
  // Cache by origin + pathname only — ignore querystrings
  const u = new URL(request.url);
  return u.origin + u.pathname;
}

function isCacheable(response) {
  // Only cache real successful image responses — no opaque, no errors
  if (!response.ok) return false;
  if (response.type === "opaque") return false;
  const ct = response.headers.get("content-type") || "";
  return ct.startsWith("image/") || ct.includes("svg");
}

self.addEventListener("fetch", event => {
  if (!isOsmTile(event.request.url)) return;

  event.respondWith(
    caches.open(TILE_CACHE).then(async cache => {
      const key = tileKey(event.request);

      // Cache-first: return cached tile immediately if available
      const cached = await cache.match(key);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (isCacheable(response)) {
          // Evict oldest tile if over limit
          const keys = await cache.keys();
          if (keys.length >= MAX_TILES) await cache.delete(keys[0]);
          await cache.put(key, response.clone());
        }
        return response;
      } catch {
        // Offline + not cached: return a crisp SVG grey placeholder
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#e8e4e0"/></svg>`;
        return new Response(svg, {
          status: 200,
          headers: { "Content-Type": "image/svg+xml" },
        });
      }
    })
  );
});
