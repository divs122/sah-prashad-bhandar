import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put, list, del } from '@vercel/blob'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { mkdir } from 'fs/promises'

const DATA_DIR = join(process.cwd(), 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  created_at: string
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
    const products = await getProductsData()
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
    const products = await getProductsData()
    const product = await request.json()

    // Generate a unique ID
    product.id = Date.now().toString()

    products.push(product)
    await saveProductsData(products)

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
export async function PUT(request: Request) {
  try {
    checkAuth()

    const body = await request.json()
    const { id, ...updateData } = body
    
    const products = await getProductsData()
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    // Update the product
    products[index] = {
      ...products[index],
      ...updateData,
      id: products[index].id // Preserve the original ID
    }

    await saveProductsData(products)

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
    
    const products = await getProductsData()
    const productToDelete = products.find(p => p.id === id)
    
    if (!productToDelete) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    // Delete the product's image if it exists
    if (productToDelete.image) {
      try {
        const imageUrl = new URL(productToDelete.image)
        const imagePath = imageUrl.pathname.split('/').pop()
        if (imagePath) {
          await del(imagePath)
        }
      } catch (error) {
        console.error('Error deleting product image:', error)
        // Continue with product deletion even if image deletion fails
      }
    }

    // Remove the product from the list
    const updatedProducts = products.filter(p => p.id !== id)
    await saveProductsData(updatedProducts)

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