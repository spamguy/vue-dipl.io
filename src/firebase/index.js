import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
});

export const db = firebaseApp.database();
