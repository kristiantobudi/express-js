/* eslint-disable @typescript-eslint/semi */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import config from '../config/config';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const dbFirebase = getFirestore(app);

export { dbFirebase };
