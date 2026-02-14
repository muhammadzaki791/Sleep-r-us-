import { NextResponse } from 'next/server'
import { client } from '../../../../lib/client'

interface NewsletterData {
  email: string
  source: string
}

export async function POST(request: Request) {
  // Verify that the Sanity client has the write token configured
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Error: SANITY_API_WRITE_TOKEN is not set in environment variables')
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const { email, source }: NewsletterData = await request.json()

    // Validate input
    if (!email || !source) {
      return NextResponse.json(
        { success: false, error: 'Email and source are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists to prevent duplicates
    try {
      const existingNewsletter = await client.fetch(
        `*[_type == "newsletter" && email == $email][0]`,
        { email }
      )

      if (existingNewsletter) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 409 }
        )
      }
    } catch (fetchError) {
      console.error('Error checking existing newsletter:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Error checking existing subscription' },
        { status: 500 }
      )
    }

    // Create newsletter document in Sanity
    const newNewsletter = {
      _type: 'newsletter',
      email: email.toLowerCase(), // Store in lowercase for consistency
      source,
      date: new Date().toISOString(),
    }

    try {
      const result = await client.create(newNewsletter)
      if (!result || !result._id) {
        throw new Error('Failed to create newsletter document in Sanity')
      }
    } catch (createError) {
      console.error('Error creating newsletter:', createError)
      const errorMessage = createError instanceof Error ? createError.message : 'Unknown error'
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error saving subscription',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe to newsletter',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}