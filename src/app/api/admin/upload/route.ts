import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const runtime = 'edge'

// Check if Blob store is configured
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.')
}

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads')

async function ensureUploadsDirectory() {
  if (!existsSync(UPLOADS_DIR)) {
    try {
      await mkdir(UPLOADS_DIR, { recursive: true })
    } catch (error) {
      console.error('Failed to create uploads directory:', error)
      throw new Error('Failed to create uploads directory')
    }
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await ensureUploadsDirectory()

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${originalName}`
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save the file
    const filePath = join(UPLOADS_DIR, filename)
    await writeFile(filePath, buffer)

    // Return the URL
    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 