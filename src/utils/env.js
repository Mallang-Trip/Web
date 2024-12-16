export const passPopupURL = `${import.meta.env.VITE_BASE_SERVER_URL}/mobileOK`;
export const BASE_SERVER_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const GTM_ID = import.meta.env.VITE_GTM_ID;
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
export const META_PIXEL_TRACKING_ID = import.meta.env
  .VITE_META_PIXEL_TRACKING_ID;

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
  authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FCM_APP_ID,
  measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
};

export const vapidKey = import.meta.env.VITE_APP_FCM_VAPID_KEY;
