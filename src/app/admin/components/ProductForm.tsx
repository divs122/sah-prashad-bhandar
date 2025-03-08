import { useState, useRef, FormEvent, useEffect } from 'react'
import type { PutBlobResult } from '@vercel/blob'

interface Product {
  id?: number
  name: string
  description: string
  price: number | string
  category: string
  image?: string
}

interface ProductFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
  initialData?: Product
}

export default function ProductForm({ onSubmit, loading, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (file: File) => {
    try {
      setUploadStatus('Uploading...')
      setUploadError('')

      // Validate file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        throw new Error('File size must be less than 4MB')
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed')
      }

      const response = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed')
      }

      if (!data.success) {
        throw new Error(data.message || 'Upload failed')
      }

      setFormData(prev => ({ ...prev, image: data.url }))
      setUploadStatus('Upload successful!')
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploadError(error.message || 'Failed to upload image. Please try again.')
      setUploadStatus('')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (uploadStatus === 'Uploading...') {
      alert('Please wait for the image to finish uploading')
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description*</label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price*</label>
        <input
          type="number"
          id="price"
          name="price"
          required
          value={formData.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category*</label>
        <input
          type="text"
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
        <p className="mt-1 text-sm text-gray-500">Max file size: 4MB. Supported formats: JPG, PNG, GIF</p>
        <input
          type="file"
          id="image"
          name="image"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handleFileUpload(file)
            }
          }}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {uploadStatus && (
          <p className="mt-2 text-sm text-green-600">
            {uploadStatus}
          </p>
        )}
        {uploadError && (
          <p className="mt-2 text-sm text-red-600">
            {uploadError}
          </p>
        )}
        {formData.image && (
          <div className="mt-2">
            <img src={formData.image} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || uploadStatus === 'Uploading...'}
          className={`px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || uploadStatus === 'Uploading...') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Saving...' : uploadStatus === 'Uploading...' ? 'Uploading...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
} 