/**
 * Settings API Route
 *
 * POST /api/settings - Save user settings
 * GET /api/settings - Get user settings
 */

import { NextRequest, NextResponse } from "next/server"
import { getUserDocument, createOrUpdateUserDocument } from "@/lib/firestore-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, settings } = body

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
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
  } catch (error: any) {
    console.error("Settings save error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to save settings",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail")

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
    }

    // Get user document
    const userDoc = await getUserDocument(userEmail)

    return NextResponse.json({
      success: true,
      settings: userDoc?.settings || null,
    })
  } catch (error: any) {
    console.error("Get settings error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to get settings" },
      { status: 500 }
    )
  }
}
