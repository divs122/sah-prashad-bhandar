'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedInput from '@/app/components/AnimatedInput'
import Image from 'next/image'

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-spiritual flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg card-hover-effect">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src="/images/Logo.png"
              alt="Sah Prashad Bhandar Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-primary">Admin Login</h2>
          <p className="mt-2 text-text-primary">Sign in to manage your products</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatedInput
            type="text"
            name="username"
            label="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />

          <AnimatedInput
            type="password"
            name="password"
            label="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full px-6 py-3 bg-primary text-white font-medium rounded-md 
              transform transition-all duration-300 
              ${isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-accent hover:scale-105 hover:shadow-lg'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 