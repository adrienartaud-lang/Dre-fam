var CACHE='dressing-famille-v5';
var FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var page=e.request.mode==='navigate';
  e.respondWith(caches.open(CACHE).then(function(c){return c.match(e.request).then(function(hit){
    var net=fetch(e.request).then(function(r){if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r;}).catch(function(){return hit;});
    return page?net.then(function(r){return r||hit;}):(hit||net);});}));
});
