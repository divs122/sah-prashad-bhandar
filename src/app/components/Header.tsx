import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Order Online', href: '/order' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-heading text-2xl md:text-3xl font-bold text-primary">
                Sah Prashad Bhandar
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-primary hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Link
              href="/order"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-accent transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 