import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    // Check authentication
    const token = cookies().get('admin_token')
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized access'
      }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file uploaded'
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const publicPath = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(publicPath, filename)

    // Ensure uploads directory exists
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to upload file'
    }, { status: 500 })
  }
} 