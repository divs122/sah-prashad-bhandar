import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Check authentication
    const token = cookies().get('admin_token')
    if (!token || token.value !== 'authenticated') {
      console.log('Upload authentication failed: No valid token')
      return NextResponse.json({
        success: false,
        message: 'Unauthorized access'
      }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({
        success: false,
        message: 'Filename is required'
      }, { status: 400 })
    }

    if (!request.body) {
      return NextResponse.json({
        success: false,
        message: 'No file content provided'
      }, { status: 400 })
    }

    // Upload to Vercel Blob Storage
    const blob = await put(filename, request, {
      access: 'public',
    })

    return NextResponse.json(blob)
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({
      success: false,
      message: `Upload failed: ${error.message}`
    }, { status: 500 })
  }
} 