import firebase from 'firebase';

importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '237114950965' // 4. Get Firebase Configuration
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
if (firebase.messaging.isSupported()) {
  importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
  const messaging = firebase.messaging();
}
