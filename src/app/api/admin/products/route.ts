import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@vercel/postgres'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  created_at: Date
}

// Middleware to check admin authentication
const checkAuth = () => {
  const token = cookies().get('admin_token')
  if (!token || token.value !== 'authenticated') {
    throw new Error('Unauthorized')
  }
}

// Helper to ensure table exists
const ensureTable = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
  } catch (error) {
    console.error('Error creating table:', error)
    throw new Error('Failed to initialize database')
  }
}

// GET - List all products
export async function GET() {
  try {
    await ensureTable()
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC;`
    
    return NextResponse.json({ 
      success: true, 
      products: rows
    })
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

    await ensureTable()
    
    const { rows: [newProduct] } = await sql`
      INSERT INTO products (name, description, price, category, image)
      VALUES (${body.name}, ${body.description}, ${Number(body.price)}, ${body.category}, ${body.image || null})
      RETURNING *;
    `

    console.log('Product created:', newProduct)

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
    
    const { rows: [updatedProduct] } = await sql`
      UPDATE products
      SET 
        name = ${updateData.name},
        description = ${updateData.description},
        price = ${Number(updateData.price)},
        category = ${updateData.category},
        image = ${updateData.image || null}
      WHERE id = ${id}
      RETURNING *;
    `
    
    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
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
    
    const { rowCount } = await sql`
      DELETE FROM products
      WHERE id = ${id};
    `
    
    if (rowCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

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