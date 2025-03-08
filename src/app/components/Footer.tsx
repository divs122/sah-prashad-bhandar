import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-divine mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">Sah Prashad Bhandar</h3>
            <p className="text-text-primary">
              Your trusted source for authentic Prashad and temple essentials near Golu Devta Temple.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-primary mb-4">Contact Us</h4>
            <address className="not-italic text-text-primary">
              <p>Near Golu Devta Temple</p>
              <p>Ghorakhal, Uttarakhand</p>
              <p className="mt-2">Phone: +91 XXXXXXXXXX</p>
              <p>Email: contact@sahprashadbhandar.com</p>
            </address>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary hover:text-accent transition-colors">
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary hover:text-accent transition-colors">
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary hover:text-accent transition-colors">
                <FaWhatsapp className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-text-primary">
            © {new Date().getFullYear()} Sah Prashad Bhandar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 