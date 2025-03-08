'use client';

import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import AnimatedInput from '../components/AnimatedInput'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again or contact us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="bg-white rounded-lg shadow-md p-8 card-hover-effect">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-divine p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                    <FaMapMarkerAlt className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors duration-300">Visit Us</h3>
                    <p className="text-text-primary">
                      Near Golu Devta Temple
                      <br />
                      Ghorakhal, Uttarakhand
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-divine p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                    <FaPhone className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors duration-300">Call Us</h3>
                    <p className="text-text-primary">+91 9675738746</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-divine p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                    <FaWhatsapp className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors duration-300">WhatsApp</h3>
                    <p className="text-text-primary">+91 9675738746</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-divine p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                    <FaEnvelope className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors duration-300">Email Us</h3>
                    <p className="text-text-primary">divyanshusah9675@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8 card-hover-effect">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Send us a Message
              </h2>

              {message.text && (
                <div 
                  className={`p-4 rounded-md mb-6 transform transition-all duration-300 ${
                    message.type === 'success' 
                      ? 'bg-green-100 text-green-700 translate-y-0 opacity-100' 
                      : 'bg-red-100 text-red-700 translate-y-0 opacity-100'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput
                  type="text"
                  name="name"
                  label="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />

                <AnimatedInput
                  type="email"
                  name="email"
                  label="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />

                <AnimatedInput
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />

                <AnimatedInput
                  type="text"
                  name="message"
                  label="Your Message"
                  required
                  textarea
                  value={formData.message}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full px-6 py-3 bg-primary text-white font-medium rounded-md 
                    transform transition-all duration-300 
                    ${isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent hover:scale-105 hover:shadow-lg'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-8 card-hover-effect">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Our Location
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d190.6977824466181!2d79.5451956!3d29.379135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a3e4baf9df39%3A0x8cc9607eb009dbd1!2sPradeep%20Parsad%20Bhandar!5e1!3m2!1sen!2sin!4v1741429277637!5m2!1sen!2sin" 
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