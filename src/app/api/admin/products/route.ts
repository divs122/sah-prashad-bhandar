import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put, list, del } from '@vercel/blob'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import { kv } from '@vercel/kv'

const DATA_DIR = join(process.cwd(), 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')
const PRODUCTS_KEY = 'products'

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
}

// Middleware to check admin authentication
const checkAuth = () => {
  const token = cookies().get('admin_token')
  if (!token || token.value !== 'authenticated') {
    throw new Error('Unauthorized')
  }
}

async function ensureDataDirectory() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
  if (!existsSync(PRODUCTS_FILE)) {
    await writeFile(PRODUCTS_FILE, JSON.stringify([], null, 2))
  }
}

async function getProductsData() {
  await ensureDataDirectory()
  const data = await readFile(PRODUCTS_FILE, 'utf-8')
  return JSON.parse(data)
}

async function saveProductsData(products: any[]) {
  await writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

// GET - List all products
export async function GET() {
  try {
    const products = (await kv.get<Product[]>(PRODUCTS_KEY)) || []
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to get products:', error)
    return NextResponse.json(
      { error: 'Failed to get products' },
      { status: 500 }
    )
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const product = await request.json()
    const products = (await kv.get<Product[]>(PRODUCTS_KEY)) || []

    // Generate a unique ID
    product.id = Date.now().toString()

    products.push(product)
    await kv.set(PRODUCTS_KEY, products)

    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const products = (await kv.get<Product[]>(PRODUCTS_KEY)) || []
    const index = products.findIndex((p) => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 })
    }

    products[index] = { ...products[index], ...updateData }
    await kv.set(PRODUCTS_KEY, products)

    return NextResponse.json(products[index])
  } catch (error) {
    console.error('Failed to update product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const products = (await kv.get<Product[]>(PRODUCTS_KEY)) || []
    const updatedProducts = products.filter((p) => p.id !== id)
    await kv.set(PRODUCTS_KEY, updatedProducts)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 