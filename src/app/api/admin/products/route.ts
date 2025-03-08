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

// Helper to read products file
const readProducts = async () => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Helper to write products file
const writeProducts = async (products: any[]) => {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

// GET - List all products
export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json({ success: true, products })
  } catch (error) {
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
    return NextResponse.json({
      success: false,
      message: error.message === 'Unauthorized' 
        ? 'Unauthorized access' 
        : 'Failed to delete product'
    }, { status: error.message === 'Unauthorized' ? 401 : 500 })
  }
} 