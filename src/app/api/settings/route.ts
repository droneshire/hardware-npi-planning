/**
 * Settings API Route
 *
 * POST /api/settings - Save user settings
 * GET /api/settings - Get user settings
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getUserDocument, createOrUpdateUserDocument } from "@/lib/firestore-server"

/**
 * Verify Firebase ID token from Authorization header
 * Returns the user email if token is valid, null otherwise
 */
async function verifyFirebaseToken(request: NextRequest): Promise<string | null> {
  try {
    // Try to get Firebase ID token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return null
    }

    const idToken = authHeader.substring(7)
    if (!idToken) {
      return null
    }

    // Verify token with Firebase (using public API for now)
    // In production, use Firebase Admin SDK
    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const user = data.users?.[0]
    return user?.email || null
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    // Try NextAuth session first
    const session = await auth()
    // Try Firebase token if no NextAuth session
    const firebaseEmail = session?.user?.email || (await verifyFirebaseToken(request))

    const body = await request.json()
    const { userEmail, settings } = body

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
    }

    // Require authentication (either NextAuth session or Firebase token)
    if (!firebaseEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user can only update their own data
    if (userEmail !== firebaseEmail) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    if (!settings) {
      return NextResponse.json({ error: "Settings are required" }, { status: 400 })
    }

    // Get existing user document to merge settings properly
    const existingDoc = await getUserDocument(userEmail)
    const existingSettings = existingDoc?.settings || {}

    // Merge new settings with existing settings
    const mergedSettings = {
      ...existingSettings,
      ...settings,
      organization: {
        ...existingSettings.organization,
        ...settings.organization,
      },
    }

    // Save merged settings to user document
    await createOrUpdateUserDocument(userEmail, {
      settings: mergedSettings,
    })

    return NextResponse.json({
      success: true,
      settings: settings,
    })
  } catch (error: unknown) {
    console.error("Settings save error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to save settings"
    const errorStack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Try NextAuth session first
    const session = await auth()
    // Try Firebase token if no NextAuth session
    const firebaseEmail = session?.user?.email || (await verifyFirebaseToken(request))

    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail")

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
    }

    // Require authentication (either NextAuth session or Firebase token)
    if (!firebaseEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user can only access their own data
    if (userEmail !== firebaseEmail) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get user document
    const userDoc = await getUserDocument(userEmail)

    return NextResponse.json({
      success: true,
      settings: userDoc?.settings || null,
    })
  } catch (error: unknown) {
    console.error("Get settings error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to get settings"
    const errorCode = error instanceof Error && "code" in error ? (error.code as string) : undefined
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error("Error details:", {
      message: errorMessage,
      code: errorCode,
      stack: errorStack,
    })
    return NextResponse.json(
      {
        error: errorMessage,
        code: errorCode,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    )
  }
}
