import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProducts, Product } from '@/lib/products'

interface GroupedProducts {
  [key: string]: Product[]
}

export default async function Products() {
  const products = await getProducts()

  // Group products by category
  const groupedProducts = products.reduce<GroupedProducts>((acc, product) => {
    const category = {
      prashad: 'Prashad & Offerings',
      statues: 'God Statues & Idols',
      equipment: 'Temple Equipment'
    }[product.category] || product.category

    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  return (
    <>
      <Header />
      <main className="bg-spiritual min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-12">
            Our Sacred Collection
          </h1>

          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <div key={category} className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-primary mb-8">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-64 md:w-1/2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6 md:w-1/2">
                        <h3 className="font-heading text-xl font-bold text-primary mb-2">
                          {product.name}
                        </h3>
                        <p className="text-text-primary mb-4">
                          {product.description}
                        </p>
                        <div className="flex flex-col space-y-4">
                          <span className="text-lg font-bold text-primary">
                            {product.price}
                          </span>
                          <Link
                            href={`/order?product=${product.id}`}
                            className="inline-block px-6 py-2 bg-primary text-white text-center rounded hover:bg-accent transition-colors"
                          >
                            Order Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
} 