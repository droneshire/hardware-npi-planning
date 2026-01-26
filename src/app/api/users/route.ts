/**
 * Users API Route
 *
 * POST /api/users - Create a new user
 */

import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/services/user.service"

// Mock organization ID - in production, this would come from authentication
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, name, email, role } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    const user = await userService.createUser({
      organizationId: organizationId || MOCK_ORGANIZATION_ID,
      email,
      name,
      role: role || "MEMBER",
    })

    return NextResponse.json({ success: true, user })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    )
  }
}
