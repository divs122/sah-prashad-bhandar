import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json')

// Middleware to check admin authentication
const checkAuth = () => {
  const token = cookies().get('admin_token')
  if (!token || token.value !== 'authenticated') {
    throw new Error('Unauthorized')
  }
}

// Helper to ensure data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Helper to read products file
const readProducts = async () => {
  try {
    await ensureDataDirectory()
    try {
      const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      // If file doesn't exist or is empty, initialize with empty array
      await fs.writeFile(PRODUCTS_FILE, '[]')
      return []
    }
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

// Helper to write products file
const writeProducts = async (products: any[]) => {
  try {
    await ensureDataDirectory()
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error('Error writing products:', error)
    throw new Error('Failed to save products')
  }
}

// GET - List all products
export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('GET products error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch products'
    }, { status: 500 })
  }
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    checkAuth()

    const body = await request.json()
    const products = await readProducts()
    
    const newProduct = {
      id: Date.now(),
      ...body
    }

    products.push(newProduct)
    await writeProducts(products)

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (error: any) {
    console.error('POST product error:', error)
    return NextResponse.json({
      success: false,
      message: error.message === 'Unauthorized' 
        ? 'Unauthorized access' 
        : 'Failed to create product'
    }, { status: error.message === 'Unauthorized' ? 401 : 500 })
  }
}

// PUT - Update product
export async function PUT(request: Request) {
  try {
    checkAuth()

    const body = await request.json()
    const { id, ...updateData } = body
    
    const products = await readProducts()
    const index = products.findIndex((p: any) => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    products[index] = { ...products[index], ...updateData }
    await writeProducts(products)

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: products[index]
    })
  } catch (error: any) {
    console.error('PUT product error:', error)
    return NextResponse.json({
      success: false,
      message: error.message === 'Unauthorized' 
        ? 'Unauthorized access' 
        : 'Failed to update product'
    }, { status: error.message === 'Unauthorized' ? 401 : 500 })
  }
}

// DELETE - Delete product
export async function DELETE(request: Request) {
  try {
    checkAuth()

    const url = new URL(request.url)
    const id = Number(url.pathname.split('/').pop())
    
    const products = await readProducts()
    const filteredProducts = products.filter((p: any) => p.id !== id)
    
    if (products.length === filteredProducts.length) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    await writeProducts(filteredProducts)

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error: any) {
    console.error('DELETE product error:', error)
    return NextResponse.json({
      success: false,
      message: error.message === 'Unauthorized' 
        ? 'Unauthorized access' 
        : 'Failed to delete product'
    }, { status: error.message === 'Unauthorized' ? 401 : 500 })
  }
} 