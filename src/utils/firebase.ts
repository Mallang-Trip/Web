import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./env";

const app = initializeApp(firebaseConfig);

export const messaging =
  "serviceWorker" in navigator ? getMessaging(app) : undefined;
