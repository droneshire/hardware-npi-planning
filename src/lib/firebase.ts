import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect"
import { connectorConfig } from "@firebasegen/default-connector"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase configuration is missing. Please check your environment variables.")
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Data Connect
export const dataConnect = getDataConnect(connectorConfig)

// Connect to emulator if in development
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
  console.log(
    "Connecting to Data Connect emulator",
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST,
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PORT || "9399"
  )
  connectDataConnectEmulator(
    dataConnect,
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST,
    parseInt(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PORT || "9399")
  )

  // Connect Storage emulator if configured
  if (typeof window === "undefined") {
    // Only connect on server side
    try {
      connectStorageEmulator(storage, process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST, 9199)
    } catch (error) {
      // Emulator might already be connected
      console.log("Storage emulator connection:", error)
    }
  }
}

export { app, auth, db, storage }
