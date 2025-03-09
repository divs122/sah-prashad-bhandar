import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.price}</p>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this product?')) {
                      await fetch(`/api/admin/products/${product.id}`, {
                        method: 'DELETE',
                      });
                      window.location.reload();
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 