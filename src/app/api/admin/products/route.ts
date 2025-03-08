import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put, list, del } from '@vercel/blob'

const PRODUCTS_FILE = 'products.json'

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

// Helper to read products
const readProducts = async (): Promise<Product[]> => {
  try {
    // List all blobs to check if products.json exists
    const { blobs } = await list()
    const productsBlob = blobs.find(b => b.pathname === PRODUCTS_FILE)

    if (!productsBlob) {
      // Initialize with empty array if file doesn't exist
      await put(PRODUCTS_FILE, JSON.stringify([]), {
        access: 'public',
        contentType: 'application/json'
      })
      return []
    }

    // Fetch the products file
    const response = await fetch(productsBlob.url)
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error reading products:', error)
    throw new Error('Failed to read products')
  }
}

// Helper to write products
const writeProducts = async (products: Product[]) => {
  try {
    await put(PRODUCTS_FILE, JSON.stringify(products, null, 2), {
      access: 'public',
      contentType: 'application/json'
    })
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
  } catch (error: any) {
    console.error('GET products error:', error)
    return NextResponse.json({
      success: false,
      message: `Failed to fetch products: ${error.message}`
    }, { status: 500 })
  }
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    checkAuth()

    const body = await request.json()
    console.log('Received product data:', body)

    const products = await readProducts()
    
    const newProduct: Product = {
      id: Date.now(),
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image,
      created_at: new Date().toISOString()
    }

    console.log('Creating new product:', newProduct)
    products.push(newProduct)
    
    console.log('Saving products...')
    await writeProducts(products)
    console.log('Products saved successfully')

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (error: any) {
    console.error('POST product error details:', {
      message: error.message,
      stack: error.stack,
      body: request.body
    })
    return NextResponse.json({
      success: false,
      message: error.message === 'Unauthorized' 
        ? 'Unauthorized access' 
        : `Failed to create product: ${error.message}`
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
    await writeProducts(updatedProducts)

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