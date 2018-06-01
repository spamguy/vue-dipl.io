/* eslint-disable no-console */
import firebase from 'firebase';

let messaging;

// Register the service worker at a custom location.
navigator.serviceWorker.register('/firebase-messaging-sw.js')
.then(sw => {
    firebase.initializeApp({
        apiKey: process.env.VUE_APP_FB_API_KEY,
        authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
        databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
        // projectId: process.env.VUE_APP_FB_PROJECT_ID,
        storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
        messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID 
    });

    messaging = firebase.messaging().useServiceWorker(sw);
    messaging.requestPermission()
    .then(() => {
        messaging.getToken()
        .then(token => console.log('Firebase token = ' + token));
    });
})
.catch(ex => console.error('A Firebase error occurred: ' + ex));

export default messaging;
