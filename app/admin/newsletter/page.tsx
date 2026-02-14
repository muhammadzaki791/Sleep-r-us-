'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { client } from '../../../lib/client'

interface NewsletterEntry {
  _id: string
  email: string
  source: string
  date: string
}

export default function NewsletterManagementPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const [subscribers, setSubscribers] = useState<NewsletterEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterEntry[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if the user's email is in the allowed admin list
      const adminEmails = process.env.NEXT_PUBLIC_CLERK_ADMIN_EMAIL_ADDRESSES?.split(',') || ['admin@sleep-r-us.com']
      const userEmail = user.primaryEmailAddress?.emailAddress
      setIsAdmin(userEmail ? adminEmails.includes(userEmail) : false)
    }

    const fetchSubscribers = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "newsletter"] | order(date desc) {
            _id,
            email,
            source,
            date
          }
        `)
        setSubscribers(data)
        setFilteredSubscribers(data)
      } catch (error) {
        console.error('Error fetching subscribers:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && isAdmin) {
      fetchSubscribers()
    }
  }, [isLoaded, isSignedIn, user, isAdmin])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredSubscribers(subscribers)
    } else {
      setFilteredSubscribers(subscribers.filter(subscriber => subscriber.source === filter))
    }
  }, [filter, subscribers])

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
            <a
              href="/sign-in"
              className="block bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Sign In
            </a>
            <p className="text-sm text-gray-500">
              Need admin access? Contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Function to download CSV
  const downloadCSV = () => {
    if (subscribers.length === 0) return;

    const headers = ['Email', 'Source', 'Date', 'ID'];
    const rows = subscribers.map(sub => [sub.email, sub.source, sub.date, sub._id]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'newsletter-subscribers.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0B3D91]">Newsletter Management</h1>
            <button
              onClick={downloadCSV}
              className="bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Export to CSV
            </button>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <label htmlFor="filter" className="text-gray-700 font-medium">Filter by source:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A5BB8] focus:border-[#1A5BB8]"
              >
                <option value="all">All Sources</option>
                <option value="footer">Footer</option>
                <option value="popup">Popup</option>
                <option value="product-page">Product Page</option>
                <option value="homepage">Homepage</option>
              </select>
              <span className="ml-auto text-gray-600">
                Showing {filteredSubscribers.length} of {subscribers.length} subscribers
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers.length > 0 ? (
                    filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0F2F5] text-[#0B3D91]">
                            {subscriber.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscriber.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}