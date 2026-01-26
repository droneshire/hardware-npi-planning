/**
 * User API Route
 *
 * PATCH /api/users/[id] - Update a user
 * DELETE /api/users/[id] - Delete a user
 */

import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/services/user.service"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, role } = body

    const user = await userService.updateUser({
      id: params.id,
      name,
      role,
    })

    return NextResponse.json({ success: true, user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await userService.deleteUser(params.id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 })
  }
}
