import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

export const runtime = 'edge'

// Check if Blob store is configured
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.')
}

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

    // Check if blob store is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured')
      return NextResponse.json({
        success: false,
        message: 'Storage configuration error: Blob storage is not configured'
      }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({
        success: false,
        message: 'Filename is required'
      }, { status: 400 })
    }

    // Create a unique filename to prevent collisions
    const uniqueFilename = `${Date.now()}-${filename}`

    // Get the file from the request
    const file = request.body
    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file content provided'
      }, { status: 400 })
    }

    const contentType = request.headers.get('content-type')
    if (!contentType?.startsWith('image/')) {
      return NextResponse.json({
        success: false,
        message: 'Only image files are allowed'
      }, { status: 400 })
    }

    console.log('Starting file upload:', {
      filename: uniqueFilename,
      contentType: contentType
    })

    try {
      // Upload to Vercel Blob Storage
      const blob = await put(uniqueFilename, file, {
        access: 'public',
        contentType: contentType,
        addRandomSuffix: false // Use our own unique filename
      })

      console.log('File uploaded successfully:', blob.url)

      return NextResponse.json({
        success: true,
        ...blob
      })
    } catch (uploadError: any) {
      console.error('Blob storage error:', uploadError)
      return NextResponse.json({
        success: false,
        message: `Storage error: ${uploadError.message}`
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Upload error:', {
      message: error.message,
      stack: error.stack
    })
    return NextResponse.json({
      success: false,
      message: `Upload failed: ${error.message}`
    }, { status: 500 })
  }
} 