'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Check admin status
    checkAdminStatus()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/check')
      const data = await response.json()
      setIsAdmin(data.isAuthenticated)
    } catch (error) {
      setIsAdmin(false)
    }
  }

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Order Online', href: '/order' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/Logo.png"
                  alt="Sah Prashad Bhandar Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className={`font-heading text-xl md:text-3xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-primary'
              } group-hover:text-accent`}>
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
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-text-primary' : 'text-primary'
                } hover:text-accent group`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-primary'
              } hover:text-accent`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6 transition-transform duration-300 rotate-90 hover:rotate-180" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6 transition-transform duration-300 hover:scale-110" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleAdminClick}
              className="group relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-primary hover:text-accent transition-colors duration-300"
            >
              <UserCircleIcon className="h-6 w-6 mr-1 transition-transform duration-300 group-hover:scale-110" />
              <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </button>

            <Link
              href="/order"
              className="group relative inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-white bg-primary overflow-hidden transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-lg"
            >
              <span className="relative flex items-center z-10">
                <ShoppingCartIcon className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Shop Now
              </span>
              <span className="absolute inset-0 bg-accent transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pt-20 pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-lg font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleAdminClick()
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-3 text-lg font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-2"
            >
              <UserCircleIcon className="h-6 w-6 inline mr-2" />
              {isAdmin ? 'Dashboard' : 'Admin Login'}
            </button>
            <Link
              href="/order"
              className="block px-4 py-3 mt-6 text-lg font-medium text-white bg-primary hover:bg-accent rounded-md transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Shop Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 