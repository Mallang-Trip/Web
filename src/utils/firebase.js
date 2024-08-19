import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
  authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FCM_APP_ID,
  measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const messaging =
  "serviceWorker" in navigator ? getMessaging(app) : undefined;
