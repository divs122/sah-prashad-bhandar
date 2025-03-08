import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const token = cookies().get('admin_token')
    return NextResponse.json({
      isAuthenticated: token?.value === 'authenticated'
    })
  } catch (error) {
    return NextResponse.json({
      isAuthenticated: false
    })
  }
} 