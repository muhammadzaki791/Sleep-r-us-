import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../../sanity/env'
import { sanityConfig } from './config'

export const client = createClient({
  ...sanityConfig,
  apiVersion,
})

// Add write token for server-side mutations
const writeToken = process.env.SANITY_API_WRITE_TOKEN

if (writeToken) {
  client.config({
    token: writeToken,
  })
}

// For client-side requests (read-only)
export const token = process.env.SANITY_API_READ_TOKEN