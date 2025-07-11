import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth, signInAnonymously } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { config } from "./firebase.config.js";

declare global {
  var __TILEDEX_DB: Firebase | undefined;
}

interface Firebase {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  uid: string;
}

function validateConfig(config: any) {
  if (!config.apiKey) {
    throw new Error("Firebase API key is required");
  }
}

async function getUid(auth: Auth) {
  await auth.authStateReady();
  return auth.currentUser?.uid;
}

async function FirebaseFactory(): Promise<Firebase> {
  const app = initializeApp(config)

  const auth = getAuth(app)
  await signInAnonymously(auth)
  const uid = await getUid(auth) || ''
  
  const db = getFirestore(app)

  return {
    app,
    auth,
    db,
    uid,
  };
}

export async function firebase() {
  if (!globalThis.__TILEDEX_DB) {
    globalThis.__TILEDEX_DB = await FirebaseFactory();
  }

  return globalThis.__TILEDEX_DB;
}