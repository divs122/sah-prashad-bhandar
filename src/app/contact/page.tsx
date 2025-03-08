import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-spiritual min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-12">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-divine p-3 rounded-full">
                    <FaMapMarkerAlt className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Visit Us</h3>
                    <p className="text-text-primary">
                      Near Golu Devta Temple
                      <br />
                      Ghorakhal, Uttarakhand
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-divine p-3 rounded-full">
                    <FaPhone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Call Us</h3>
                    <p className="text-text-primary">+91 XXXXXXXXXX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-divine p-3 rounded-full">
                    <FaWhatsapp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">WhatsApp</h3>
                    <p className="text-text-primary">+91 XXXXXXXXXX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-divine p-3 rounded-full">
                    <FaEnvelope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Email Us</h3>
                    <p className="text-text-primary">contact@sahprashadbhandar.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input-field"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Our Location
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.039059539474!2d79.54518637805359!3d29.379128833852246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a2a0def7a453%3A0x4b38c04dcb183e41!2sGhorakhal%2C%20Uttarakhand%20263156!5e1!3m2!1sen!2sin!4v1741425841056!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 