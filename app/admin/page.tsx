'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '../../lib/client'
import { Route } from 'next/dist/build/swc/types'

export default function AdminPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const [newsletterCount, setNewsletterCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if the user's email is in the allowed admin list
      const adminEmails = process.env.NEXT_PUBLIC_CLERK_ADMIN_EMAIL_ADDRESSES?.split(',') || ['admin@sleep-r-us.com']
      const userEmail = user.primaryEmailAddress?.emailAddress
      setIsAdmin(userEmail ? adminEmails.includes(userEmail) : false)
    }

    // Fetch newsletter count
    const fetchNewsletterCount = async () => {
      try {
        const count = await client.fetch(`count(*[_type == "newsletter"])`)
        setNewsletterCount(count)
      } catch (error) {
        console.error('Error fetching newsletter count:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && isAdmin) {
      fetchNewsletterCount()
    }
  }, [isLoaded, isSignedIn, user, isAdmin])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
          <p className="mt-4 text-[#0B3D91]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#0B3D91] mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You must be an administrator to access this page.
          </p>
          <div className="space-y-4">
            <Link
              href="/sign-in"
              className="block bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Sign In
            </Link>
            <p className="text-sm text-gray-500">
              Need admin access? Contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-[#0B3D91] mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-[#0B3D91] mb-2">Welcome, {user.firstName || user.username || 'Admin'}</h2>
              <p className="text-gray-600">Manage your Sleep R Us website content</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h2 className="text-xl font-semibold text-[#0B3D91] mb-2">Newsletter Subscribers</h2>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : (
                <p className="text-3xl font-bold text-[#1A5BB8]">{newsletterCount}</p>
              )}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <h2 className="text-xl font-semibold text-[#0B3D91] mb-2">Account</h2>
              <p className="text-gray-600">Signed in as: {user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Content Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/studio"
                className="bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                Manage Content in Sanity Studio
              </a>
              <Link
                href="/admin/newsletter"
                className="bg-[#1A5BB8] hover:bg-[#14468f] text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                View Newsletter Subscribers
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/studio/structure/mattress"
                className="bg-white border border-gray-200 hover:border-[#0B3D91] text-[#0B3D91] font-medium py-3 px-6 rounded-md transition-colors text-center"
              >
                Manage Mattresses
              </Link>
              <Link
                href="/studio/structure/bed"
                className="bg-white border border-gray-200 hover:border-[#0B3D91] text-[#0B3D91] font-medium py-3 px-6 rounded-md transition-colors text-center"
              >
                Manage Bed Frames
              </Link>
              <Link
                href="/studio/structure/categories"
                className="bg-white border border-gray-200 hover:border-[#0B3D91] text-[#0B3D91] font-medium py-3 px-6 rounded-md transition-colors text-center"
              >
                Manage Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}