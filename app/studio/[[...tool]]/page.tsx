/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

// Note: metadata and viewport are not exported here since this is a client component
// The studio handles its own metadata internally

export default function StudioPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if the user's email is in the allowed admin list
      const adminEmails = process.env.NEXT_PUBLIC_CLERK_ADMIN_EMAIL_ADDRESSES?.split(',') || ['muhammadzaki.ayaz@gmail.com']
      const userEmail = user.primaryEmailAddress?.emailAddress
      setHasAccess(userEmail ? adminEmails.includes(userEmail) : false)
    } else if (isLoaded && !isSignedIn) {
      // Redirect to sign in if not signed in
      window.location.href = '/sign-in'
    }
  }, [isLoaded, isSignedIn, user])

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

  if (!isSignedIn) {
    return null // This should redirect via useEffect
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#0B3D91] mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You must be an administrator to access the Sanity Studio.
          </p>
          <a
            href="/"
            className="block bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    )
  }

  // Render the studio only if the user has access
  return <NextStudio config={config} />
}
