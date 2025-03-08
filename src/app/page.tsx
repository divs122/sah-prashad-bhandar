import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

const featuredProducts = [
  {
    id: 1,
    name: 'Golu Devta Murti',
    description: 'Divine idol of Golu Devta, blessed and consecrated',
    image: '/images/murti.png',
    price: '₹2,501',
  },
  {
    id: 2,
    name: 'Prashad Thali',
    description: 'Box includes: Doop, Khichdi, Pithiya/Chandan, Shringaar, Nariyal with chunri, Parmal, Ilaichidana, Batasha',
    image: '/images/prashad.jpg',
    price: '₹151',
  },
  {
    id: 3,
    name: 'Blowing Shank',
    description: 'Loud Resounding Sound',
    image: '/images/blowing shank.jpg',
    price: '₹2,101',
  },
  {
    id: 4,
    name: 'Brass Temple Bell',
    description: 'Traditional temple bell with divine sound',
    image: '/images/bell3.jpg',
    price: '₹1,000/kg',
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-divine-glow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
                Pure Prashad & Temple Essentials
              </h1>
              <p className="text-xl md:text-2xl text-text-primary mb-8">
                Direct from Golu Devta Temple - Bringing Divine Blessings to Your Doorstep
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-accent transition-colors"
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-spiritual">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-2"
                      priority={product.id <= 2}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-primary mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-primary mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        {product.price}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-divine">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  Authentic & Blessed
                </h3>
                <p className="text-text-primary">
                  Every item is blessed at Golu Devta Temple
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛕</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  Temple Location
                </h3>
                <p className="text-text-primary">
                  Located at the main gate of Golu Devta Temple
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  Quality Assured
                </h3>
                <p className="text-text-primary">
                  100% quality guaranteed temple essentials
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 