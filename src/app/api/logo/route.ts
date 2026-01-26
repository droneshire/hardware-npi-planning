/**
 * Logo API Route
 *
 * POST /api/logo - Save logo URL to user document (upload happens client-side)
 * GET /api/logo - Get company logo URL
 */

import { NextRequest, NextResponse } from "next/server"
import { getUserDocument, createOrUpdateUserDocument } from "@/lib/firestore-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, logoUrl } = body

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
    }

    // logoUrl can be null to remove the logo
    if (logoUrl === undefined) {
      return NextResponse.json({ error: "Logo URL is required" }, { status: 400 })
    }

    // Get existing user document to merge settings properly
    const existingDoc = await getUserDocument(userEmail)
    const existingSettings = existingDoc?.settings || {}

    // Merge new logo URL with existing settings
    const mergedSettings = {
      ...existingSettings,
      organization: {
        ...existingSettings.organization,
        logoUrl: logoUrl || undefined, // Convert null to undefined for Firestore
      },
    }

    // Save merged settings to user document
    await createOrUpdateUserDocument(userEmail, {
      settings: mergedSettings,
    })

    return NextResponse.json({
      success: true,
      logoUrl: logoUrl,
    })
  } catch (error: any) {
    console.error("Logo save error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to save logo URL",
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
    const logoUrl = userDoc?.settings?.organization?.logoUrl

    return NextResponse.json({
      success: true,
      logoUrl: logoUrl || null,
    })
  } catch (error: any) {
    console.error("Get logo error:", error)
    return NextResponse.json({ error: error.message || "Failed to get logo" }, { status: 500 })
  }
}
