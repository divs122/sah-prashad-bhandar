import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Order Online', href: '/order' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/images/Logo.png"
                  alt="Sah Prashad Bhandar Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-heading text-xl md:text-3xl font-bold text-primary">
                Sah Prashad Bhandar
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Shop Now Button - Desktop */}
          <div className="hidden md:flex items-center">
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

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/order"
            className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-accent rounded-md mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="flex items-center">
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Shop Now
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 