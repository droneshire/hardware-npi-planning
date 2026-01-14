"use client"

import { useEffect, useState } from "react"
import {
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  FirestoreError,
  DocumentSnapshot,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { UserDocument, AdminDocument } from "@/types/firestore"
import { FIRESTORE_COLLECTIONS } from "@/constants/firestore"

export function useDocumentSnapshot<DocType>(
  docReference: DocumentReference<DocType> | undefined
): DocumentSnapshot<DocType> | undefined {
  const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocType> | undefined>()

  useEffect(() => {
    if (!docReference) {
      return
    }
    return onSnapshot(
      docReference,
      (snap) => setDocSnap(snap),
      (error: FirestoreError) => {
        console.error("Firestore error:", error)
      }
    )
  }, [docReference])

  return docSnap
}

// Get user document reference by email
export function getUserDocRef(email: string): DocumentReference<UserDocument> {
  return doc(collection(db, FIRESTORE_COLLECTIONS.USER), email) as DocumentReference<UserDocument>
}

// Get admin document reference
export function getAdminDocRef(docId: string): DocumentReference<AdminDocument> {
  return doc(collection(db, FIRESTORE_COLLECTIONS.ADMIN), docId) as DocumentReference<AdminDocument>
}

// Create or update user document
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

// Get user document
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
