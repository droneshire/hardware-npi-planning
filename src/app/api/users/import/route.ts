/**
 * Import Users API Route
 *
 * POST /api/users/import - Bulk import users from CSV data
 */

import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/services/user.service"

// Mock organization ID - in production, this would come from authentication
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, users } = body

    if (!users || !Array.isArray(users)) {
      return NextResponse.json({ error: "Users array is required" }, { status: 400 })
    }

    const result = await userService.bulkCreateUsers(organizationId || MOCK_ORGANIZATION_ID, users)

    return NextResponse.json({
      success: true,
      created: result.created.length,
      errors: result.errors,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to import users" }, { status: 500 })
  }
}
