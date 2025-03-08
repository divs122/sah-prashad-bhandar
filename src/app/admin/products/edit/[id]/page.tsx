'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '../../../components/ProductForm'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`)
      const data = await response.json()
      
      if (data.success) {
        setProduct(data.product)
      } else {
        setError('Failed to fetch product')
      }
    } catch (error) {
      setError('Error loading product')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(params.id),
          ...formData
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/products')
      } else {
        alert(data.message || 'Failed to update product')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to update product')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 