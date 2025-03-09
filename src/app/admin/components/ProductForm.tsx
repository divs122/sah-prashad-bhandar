'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
  };
  mode?: 'create' | 'edit';
}

export default function ProductForm({ initialData, mode = 'create' }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || 'prashad',
    image: initialData?.image || '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First upload the image if there's a new file
      let imageUrl = formData.image;
      if (selectedFile) {
        const formDataFile = new FormData();
        formDataFile.append('file', selectedFile);
        
        console.log('Uploading image...');
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataFile,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json();
          throw new Error(uploadError.error || 'Failed to upload image');
        }

        const uploadData = await uploadRes.json();
        console.log('Image uploaded successfully:', uploadData);
        imageUrl = uploadData.url;
      }

      // Then create/update the product
      const productData = {
        ...formData,
        image: imageUrl,
      };

      console.log('Saving product data:', productData);
      const endpoint = mode === 'create' 
        ? '/api/admin/products' 
        : `/api/admin/products/${initialData?.id}`;

      const res = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      console.log('Product saved successfully:', data);
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          required
          value={formData.price}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="prashad">Prashad & Offerings</option>
          <option value="statues">God Statues & Idols</option>
          <option value="equipment">Temple Equipment</option>
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Product preview"
              className="h-32 w-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>
    </form>
  );
} 