this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/js/scripts.js',
        '/css/styles.css',
        '/jquery/jquery.js',
        '/assets/brush1.svg',
        '/assets/brush2.svg',
        '/assets/brush3.svg',
        '/assets/brush4.svg',
        '/assets/brush5.svg',
        '/assets/lock.svg',
        '/assets/paint1.svg',
        '/assets/paint2.svg',
        '/assets/paint3.svg',
        '/assets/paint4.svg',
        '/assets/paint5.svg',
        '/assets/unlock.svg'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

this.addEventListener('activate', (event) => {
  let cacheWhitelist = ['assets-v1'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
