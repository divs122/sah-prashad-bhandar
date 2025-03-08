import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const categories = [
  {
    id: 'prashad',
    name: 'Prashad & Offerings',
    products: [
      {
        id: 1,
        name: 'Prashad Thali',
        description: 'Box includes: Doop, Khichdi, Pithiya/Chandan, Shringaar, Nariyal with chunri, Parmal, Ilaichidana, Batasha',
        price: '₹151',
        image: '/images/prashad-box.jpg',
      },
      {
        id: 2,
        name: 'Dry Fruit Prashad',
        description: 'Premium dry fruits blessed at the temple',
        price: '₹751',
        image: '/images/dry-fruits.jpg',
      },
    ],
  },
  {
    id: 'statues',
    name: 'God Statues & Idols',
    products: [
      {
        id: 3,
        name: 'Brass Golu Devta Idol',
        description: 'Handcrafted brass idol of Golu Devta, blessed and consecrated at the temple',
        price: '₹5,101',
        image: '/images/murti.png',
      },
      {
        id: 4,
        name: 'Brass Golu Devta Idol (Large)',
        description: 'Handcrafted brass idol of Golu Devta - Temple Size',
        price: '₹15,101',
        image: '/images/golu-devta.jpg',
      },
      {
        id: 5,
        name: 'Marble Temple Set',
        description: 'Complete marble temple set with deities',
        price: '₹15,101',
        image: '/images/temple-set.jpg',
      },
    ],
  },
  {
    id: 'equipment',
    name: 'Temple Equipment',
    products: [
      {
        id: 6,
        name: 'Temple Bell Set',
        description: 'Traditional brass bells in various sizes',
        price: '₹1,000/kg',
        image: '/images/bell3.jpg',
      },
      {
        id: 7,
        name: 'Puja Thali Set',
        description: 'Complete brass puja thali with all accessories',
        price: '₹1,501',
        image: '/images/puja-thali.jpg',
      },
    ],
  },
]

export default function Products() {
  return (
    <>
      <Header />
      <main className="bg-spiritual min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-12">
            Our Sacred Collection
          </h1>

          {categories.map((category) => (
            <div key={category.id} className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-primary mb-8">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {category.products.map((product) => (
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
                          className={`${
                            product.id === 3 ? 'object-contain p-4 scale-75' : 
                            product.id === 6 ? 'object-cover p-0' : 
                            'object-contain p-2'
                          }`}
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