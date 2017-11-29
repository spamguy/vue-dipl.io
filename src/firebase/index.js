import firebase from 'firebase';

let messaging;
try {
    // Register the service worker at a custom location.
    navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
    .then(sw => {
        firebase.initializeApp({
            apiKey: process.env.FB_API_KEY,
            authDomain: process.env.FB_AUTH_DOMAIN,
            databaseURL: process.env.FB_DATABASE_URL,
            // projectId: process.env.FB_PROJECT_ID,
            storageBucket: process.env.FB_STORAGE_BUCKET,
            messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
        });

        messaging = firebase.messaging().useServiceWorker(sw);
        messaging.requestPermission()
        .then(() => {
            messaging.getToken()
            .then(token => console.log('Firebase token = ' + token));
        });
    });
}
catch (ex) {
    console.error('A Firebase error occurred: ' + ex);
}

export default messaging;
