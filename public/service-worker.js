this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/js/scripts.js',
        '/css/styles.css',
        '/assets',
        '/jquery/jquery.js'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(error => console.log(error.message))
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

// this.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open('assets-v1').then(cache => {
//       return cache.addAll([
//         '/',
//         '/js/scripts.js',
//         '/css/styles.css',
//         '/assets'
//       ])
//     })
//   )
// })

// this.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         return response || fetch(event.request)
//       })
//   )
// })

// this.addEventListener('activate', event => {
//   let cacheWhiteList = ['assets-v1'];

//   event.waitUntil(
//     caches.keys()
//       .then(keyList => {
//         return Promise.all(keyList.map(key => {
//           if (cacheWhiteList.indexOf(key) === -1) {
//             return caches.delete(key);
//           }
//         }))
//       })
//   )
// })
