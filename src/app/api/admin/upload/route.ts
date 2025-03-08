import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

export async function POST(request: Request) {
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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.log('Upload failed: No file provided')
      return NextResponse.json({
        success: false,
        message: 'No file uploaded'
      }, { status: 400 })
    }

    console.log('Processing file upload:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Check if BLOB store is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured')
      return NextResponse.json({
        success: false,
        message: 'Storage configuration error'
      }, { status: 500 })
    }

    // Upload to Vercel Blob Storage
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    
    console.log('Uploading to blob storage:', filename)
    const { url } = await put(filename, file, {
      access: 'public',
    })
    console.log('File uploaded successfully:', url)

    return NextResponse.json({
      success: true,
      url: url
    })
  } catch (error: any) {
    console.error('Upload error details:', {
      message: error.message,
      stack: error.stack,
      type: error.name
    })
    return NextResponse.json({
      success: false,
      message: `Failed to upload file: ${error.message}`
    }, { status: 500 })
  }
} 