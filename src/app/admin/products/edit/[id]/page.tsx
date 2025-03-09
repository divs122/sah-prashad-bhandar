import React from 'react';
import ProductForm from '../../../components/ProductForm';
import { getProduct } from '@/lib/products';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Edit Product</h1>
      <ProductForm mode="edit" initialData={product} />
    </div>
  );
} 