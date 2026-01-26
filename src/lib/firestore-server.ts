/**
 * Server-side Firestore utilities
 * These functions can be used in API routes and server components
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { UserDocument, AdminDocument } from "@/types/firestore"
import { FIRESTORE_COLLECTIONS } from "@/constants/firestore"

// Get user document reference by email
export function getUserDocRef(email: string) {
  return doc(collection(db, FIRESTORE_COLLECTIONS.USER), email)
}

// Get admin document reference
export function getAdminDocRef(docId: string) {
  return doc(collection(db, FIRESTORE_COLLECTIONS.ADMIN), docId)
}

// Create or update user document (server-side)
export async function createOrUpdateUserDocument(
  email: string,
  data?: Partial<UserDocument>
): Promise<void> {
  const userRef = getUserDocRef(email)
  const now = new Date().toISOString()

  try {
    const existingDoc = await getDoc(userRef)
    if (existingDoc.exists()) {
      // Update existing document
      await setDoc(
        userRef,
        {
          ...data,
          updatedAt: now,
        },
        { merge: true }
      )
    } else {
      // Create new document
      await setDoc(userRef, {
        email,
        ...data,
        createdAt: now,
        updatedAt: now,
      })
    }
  } catch (error) {
    console.error("Error creating/updating user document:", error)
    throw error
  }
}

// Get user document (server-side)
export async function getUserDocument(email: string): Promise<UserDocument | null> {
  const userRef = getUserDocRef(email)
  try {
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      return docSnap.data() as UserDocument
    }
    return null
  } catch (error) {
    console.error("Error getting user document:", error)
    throw error
  }
}
