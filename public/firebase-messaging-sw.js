// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.

const firebaseConfig = {
  apiKey: 'AIzaSyDuh7nn6CepecaygcTQnVpLi3kZ8JPKFhg',
  authDomain: 'doggy-chat.firebaseapp.com',
  databaseURL: 'https://doggy-chat.firebaseio.com',
  projectId: 'doggy-chat',
  storageBucket: 'doggy-chat.appspot.com',
  messagingSenderId: '237114950965',
  appId: '1:237114950965:web:eb7a2e32df63c13132787c',
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]
