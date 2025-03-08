import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

interface Product {
  _id?: ObjectId
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

// Middleware to check admin authentication
const checkAuth = () => {
  const token = cookies().get('admin_token')
  if (!token || token.value !== 'authenticated') {
    throw new Error('Unauthorized')
  }
}

// Helper to get MongoDB collection
const getCollection = async () => {
  try {
    const client = await clientPromise
    const db = client.db('sah-prashad')
    return db.collection<Product>('products')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to database')
  }
}

// GET - List all products
export async function GET() {
  try {
    const collection = await getCollection()
    const products = await collection.find({}).toArray()
    
    return NextResponse.json({ 
      success: true, 
      products: products.map(p => ({
        ...p,
        _id: p._id?.toString() // Convert ObjectId to string
      }))
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

    const collection = await getCollection()
    
    const newProduct: Product = {
      id: Date.now(),
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image
    }

    console.log('Creating new product:', newProduct)
    const result = await collection.insertOne(newProduct)
    console.log('Product created with ID:', result.insertedId)

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: {
        ...newProduct,
        _id: result.insertedId.toString()
      }
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
    
    const collection = await getCollection()
    const result = await collection.findOneAndUpdate(
      { id: id },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    
    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: {
        ...result,
        _id: result._id?.toString()
      }
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
    
    const collection = await getCollection()
    const result = await collection.deleteOne({ id: id })
    
    if (result.deletedCount === 0) {
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