import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { sanityConfig } from './config'

const builder = imageUrlBuilder(sanityConfig)

export const urlFor = (source: Image) => {
  return builder.image(source).auto('format').fit('max')
}

// Helper function to get Sanity image URL with specific dimensions
export const getImageUrl = (source: Image, width?: number, height?: number) => {
  let imageUrl = builder.image(source).auto('format').fit('max')

  if (width) {
    imageUrl = imageUrl.width(width)
  }

  if (height) {
    imageUrl = imageUrl.height(height)
  }

  return imageUrl.url()
}