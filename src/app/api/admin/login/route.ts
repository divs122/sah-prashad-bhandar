import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // In a real application, you would:
      // 1. Use a secure password hashing algorithm
      // 2. Store credentials in a database
      // 3. Generate a proper JWT token
      // 4. Set secure HTTP-only cookies
      
      cookies().set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      })

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid credentials'
    }, { status: 401 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'An error occurred'
    }, { status: 500 })
  }
} 