const V="quaderno-2026-11-02a";
const SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=="quaderno-news"&&k!=="quaderno-fonts").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.includes("/news/")){ // notícias: rede primeiro, cache se offline
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open("quaderno-news").then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||Response.error())));return}
 if(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com"){ // fontes: cache, atualiza em segundo plano
  e.respondWith(caches.open("quaderno-fonts").then(c=>c.match(r).then(m=>{const net=fetch(r).then(res=>{if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}).catch(()=>m);return m||net})));return}
 if(u.origin===location.origin){ // app: rede primeiro (sempre a versão nova), cache quando offline
  e.respondWith(fetch(r,{cache:"no-cache"}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
   .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))))}});
self.addEventListener("message",e=>{if(e.data==="skipWaiting")self.skipWaiting()});
