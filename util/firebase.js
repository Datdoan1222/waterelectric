import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPEyghS-8ar2VeHnnMnfC_9SzS3WPS83U",
  authDomain: "electricalpower-94b8d.firebaseapp.com",
  databaseURL:
    "https://electricalpower-94b8d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "electricalpower-94b8d",
  storageBucket: "electricalpower-94b8d.appspot.com",
  messagingSenderId: "252402474087",
  appId: "1:252402474087:web:33e2157290651762e588c2",
  measurementId: "G-5TS1YFD2NE",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
