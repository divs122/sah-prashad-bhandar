import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    cookies().delete('admin_token')
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to logout'
    }, { status: 500 })
  }
} 