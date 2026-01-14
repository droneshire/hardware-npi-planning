"use client"

import { useEffect, useState } from "react"
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { app, auth } from "@/lib/firebase"
import { createOrUpdateUserDocument } from "./use-firestore"

export const useAuthStateWatcher = () => {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("Setting up auth state watcher...")
    try {
      // Add a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.warn("Auth state watcher timeout - proceeding without auth")
        setIsLoading(false)
      }, 3000)

      const unsubscribe = auth.onAuthStateChanged(
        async (user) => {
          clearTimeout(timeout)
          console.log("Auth state changed:", user ? "User logged in" : "No user")
          setUserState(user)
          setIsLoading(false)

          // Create or update user document in Firestore
          if (user?.email) {
            try {
              await createOrUpdateUserDocument(user.email, {
                email: user.email,
              })
              console.log(`User document created/updated for ${user.email}`)
            } catch (error) {
              console.error("Failed to create/update user document:", error)
              // Don't block auth flow if Firestore fails
            }
          }
        },
        (error) => {
          clearTimeout(timeout)
          console.error("Auth state error:", error)
          setIsLoading(false)
        }
      )

      return () => {
        clearTimeout(timeout)
        unsubscribe()
      }
    } catch (error) {
      console.error("Failed to set up auth state watcher:", error)
      setIsLoading(false)
    }
  }, [])

  return { user, isLoading }
}

interface EmailLoginProps {
  email: string
  password: string
}

export const logInWithEmailAndPassword = async (props: EmailLoginProps) => {
  const { email, password } = props
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      throw err
    }
    throw new Error("An unknown error occurred")
  }
}

export const registerWithEmailAndPassword = async (props: EmailLoginProps) => {
  const { email, password } = props
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Create user document in Firestore
    if (userCredential.user?.email) {
      try {
        await createOrUpdateUserDocument(userCredential.user.email, {
          email: userCredential.user.email,
        })
        console.log(`User document created for ${userCredential.user.email}`)
      } catch (error) {
        console.error("Failed to create user document:", error)
        // Don't block registration if Firestore fails
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      throw err
    }
    throw new Error("An unknown error occurred")
  }
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      throw err
    }
    throw new Error("An unknown error occurred")
  }
}

export const logout = () => {
  signOut(auth)
}

const signInWithProvider = async (providerFactory: () => GoogleAuthProvider) => {
  // Check if popups are supported
  if (typeof window !== "undefined" && !window.open) {
    throw new Error(
      "Your browser does not support popup windows. Please enable popups or try a different browser."
    )
  }

  try {
    await signInWithPopup(auth, providerFactory())
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/popup-blocked":
          // Try redirect as fallback
          try {
            await signInWithRedirect(auth, providerFactory())
          } catch {
            throw new Error(
              "Popup was blocked and redirect failed. Please allow popups for this site and try again."
            )
          }
          break
        case "auth/cancelled-popup-request":
          // This usually happens when multiple popup requests are made
          console.log("Popup request was cancelled")
          break
        case "auth/popup-closed-by-user":
          console.log("User closed the popup")
          break
        case "auth/network-request-failed":
          throw new Error("Network error occurred. Please check your internet connection and try again.")
        default:
          console.error("Authentication error:", error.message)
          throw error
      }
    } else {
      console.error("Unexpected error:", error)
      throw new Error("An unexpected error occurred during authentication.")
    }
  }
}

export const signInWithGoogle = async () => {
  try {
    await signInWithProvider(() => new GoogleAuthProvider())
    // Navigation will happen via auth state change
  } catch (error) {
    console.error("Google sign in error:", error)
    throw error
  }
}

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth)
    if (result) {
      console.log("Successfully signed in via redirect")
      return result
    }
    return null
  } catch (error) {
    console.error("Error getting redirect result:", error)
    throw error
  }
}
