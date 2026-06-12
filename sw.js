// ユメササヤキ Service Worker
// アプリシェルをキャッシュしてオフラインでも起動できるようにする
const CACHE_NAME = 'yume-sasayaki-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

// インストール時: アプリシェルを事前キャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 有効化時: 古いバージョンのキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// フェッチ: キャッシュ優先 + ネットワークフォールバック
// (フォント等の外部リソースはネットワーク優先、失敗時キャッシュ)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    // 自分のファイルはキャッシュ優先
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    // Google Fonts等はネットワーク優先、取得できたらキャッシュに保存
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
