'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AnimatedInput from '@/app/components/AnimatedInput'
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa'

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  category: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }))
        setSuccess('Image uploaded successfully')
      } else {
        setError('Failed to upload image')
      }
    } catch (error) {
      setError('Error uploading image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/admin/products', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditing ? { ...formData, id: selectedProduct?.id } : formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(isEditing ? 'Product updated successfully' : 'Product added successfully')
        setFormData({ name: '', description: '', price: '', image: '', category: '' })
        setIsEditing(false)
        setSelectedProduct(null)
        // Refresh products list
        fetchProducts()
      } else {
        setError(data.message || 'Failed to save product')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Product deleted successfully')
        fetchProducts()
      } else {
        setError(data.message || 'Failed to delete product')
      }
    } catch (error) {
      setError('An error occurred while deleting the product')
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      setError('Failed to fetch products')
    }
  }

  const handleLogout = () => {
    // Add logout logic here
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-spiritual">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-primary rounded-md hover:bg-accent transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>

            {(error || success) && (
              <div className={`p-4 rounded-md mb-6 ${
                error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {error || success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                type="text"
                name="name"
                label="Product Name"
                required
                value={formData.name}
                onChange={handleChange}
              />

              <AnimatedInput
                type="text"
                name="description"
                label="Description"
                required
                textarea
                value={formData.description}
                onChange={handleChange}
              />

              <AnimatedInput
                type="text"
                name="price"
                label="Price"
                required
                value={formData.price}
                onChange={handleChange}
              />

              <AnimatedInput
                type="text"
                name="category"
                label="Category"
                required
                value={formData.category}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full px-6 py-3 bg-primary text-white font-medium rounded-md 
                  transform transition-all duration-300 
                  ${isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-accent hover:scale-105 hover:shadow-lg'
                  }
                `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  isEditing ? 'Update Product' : 'Add Product'
                )}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Products</h2>
            <div className="space-y-4">
              {products.map(product => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 