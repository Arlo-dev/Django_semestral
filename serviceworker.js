//Manejo de service Worker
var cachesito = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/static/css/hojaJQ.css',
    '/static/css/ubikeichon.css',
    '/ubicacion/',
    '/servicios/',
    '/galeria/',
    '/consulta/',
    '/atenciones/',

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cachesito)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

          return fetch(event.request)
          .catch(function(rsp) {
             return response; 
          });
          
          
        })
    );
});
//Fin de Service Worker
//////////////////////////////////////////////////////////////////////

//Manejo de notificaciones
importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js")


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDCm76Zzc_Y75j13l17IUxyPwSjQj6fzOI",
  authDomain: "djangosemestral-007.firebaseapp.com",
  projectId: "djangosemestral-007",
  storageBucket: "djangosemestral-007.appspot.com",
  messagingSenderId: "308780336869",
  appId: "1:308780336869:web:f8d4a8d14e4fe826f9760c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//Fin manejo de notificaciones
////////////////////////////////////////////////////////////


//OFFLINE
let messaging = firebase.messaging();
/////////////// modelo de notificacion offline ////////////
messaging.setBackgroundMessageHandler(function(payload) {
    let titulo = 'toy offline'
    let opciones = {
        body: 'Apagaaa la consola',
        icon: '/static/img/arturito.png'
    }
    self.registration.showNotification(titulo, opciones)
});
////////////////////////////////////////////////////////////





