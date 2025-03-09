export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/admin/products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/admin/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
} 