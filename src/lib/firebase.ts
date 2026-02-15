import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect"
import { connectorConfig } from "@firebasegen/default-connector"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
if (import.meta.env.VITE_FIREBASE_EMULATOR_HOST) {
  const host = import.meta.env.VITE_FIREBASE_EMULATOR_HOST
  const authPort = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT || "9099"

  try {
    connectAuthEmulator(auth, `http://${host}:${authPort}`, { disableWarnings: true })
    console.log("Connected to Auth emulator")
  } catch (error: any) {
    if (error?.message?.includes("already been called")) {
      console.log("Auth emulator already connected")
    } else {
      console.log("Auth emulator connection:", error?.message || error)
    }
  }

  console.log(
    "Connecting to Data Connect emulator",
    host,
    import.meta.env.VITE_FIREBASE_EMULATOR_PORT || "9399"
  )
  connectDataConnectEmulator(
    dataConnect,
    host,
    parseInt(import.meta.env.VITE_FIREBASE_EMULATOR_PORT || "9399")
  )

  // Connect Firestore and Storage emulators
  try {
    connectFirestoreEmulator(db, host, 8080)
    console.log("Connected to Firestore emulator")
  } catch (error: any) {
    // Emulator might already be connected or not available
    if (error?.message?.includes("already been called")) {
      console.log("Firestore emulator already connected")
    } else {
      console.log("Firestore emulator connection:", error?.message || error)
    }
  }

  // Connect Storage emulator
  try {
    connectStorageEmulator(storage, host, 9199)
    console.log("Connected to Storage emulator")
  } catch (error: any) {
    // Emulator might already be connected
    if (error?.message?.includes("already been called")) {
      console.log("Storage emulator already connected")
    } else {
      console.log("Storage emulator connection:", error?.message || error)
    }
  }
}

export { app, auth, db, storage }

/**
 * Get the current user's Firebase ID token for API authentication
 * Returns null if no user is authenticated
 */
export async function getFirebaseIdToken(): Promise<string | null> {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) {
      return null
    }
    return await currentUser.getIdToken()
  } catch (error) {
    console.error("Error getting Firebase ID token:", error)
    return null
  }
}
