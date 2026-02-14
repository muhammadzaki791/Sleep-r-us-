'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

const NewsletterForm = ({ source = 'footer' }: { source?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source: source,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Newsletter subscription error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <p>Thank you for subscribing!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full px-4 py-2 rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#1A5BB8]`}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </form>
  )
}

export default NewsletterForm