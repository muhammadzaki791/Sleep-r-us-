// Brand Colors for Sleep R Us - Beds & Mattresses Catalogue
// According to the specification, these are the brand color requirements:
// - Primary: #0B3D91 (dark blue)
// - Secondary/Accent: #1A5BB8 (lighter blue)
// - Background: #FFFFFF (white)
// - Cards / subtle backgrounds: #F0F2F5 (light gray)
// - Text: #0B3D91 (headings), #333333 (body)

export const BRAND_COLORS = {
  primary: {
    main: '#0B3D91', // Dark blue
    dark: '#082a69', // Darker shade
    light: '#1e56a8', // Lighter shade
  },
  secondary: {
    main: '#1A5BB8', // Lighter blue
    dark: '#14468f', // Darker shade
    light: '#2c6dd0', // Lighter shade
  },
  background: {
    main: '#FFFFFF', // White
    subtle: '#F0F2F5', // Light gray
    paper: '#FAFBFC', // Very light gray
  },
  text: {
    primary: '#0B3D91', // Heading text
    secondary: '#333333', // Body text
    disabled: '#9CA3AF', // Disabled text
  },
  success: {
    main: '#10B981', // Green for success states
  },
  error: {
    main: '#EF4444', // Red for error states
  },
  warning: {
    main: '#F59E0B', // Amber for warning states
  },
  info: {
    main: '#3B82F6', // Blue for info states
  },
} as const

// Color classes for Tailwind CSS
export const TAILWIND_COLOR_CLASSES = {
  primary: {
    main: 'text-primary-600',
    bg: 'bg-primary-600',
    hover: 'hover:bg-primary-700',
  },
  secondary: {
    main: 'text-secondary-600',
    bg: 'bg-secondary-600',
    hover: 'hover:bg-secondary-700',
  },
  background: {
    main: 'bg-white',
    subtle: 'bg-gray-50',
    paper: 'bg-gray-25',
  },
  text: {
    primary: 'text-primary-600',
    secondary: 'text-gray-700',
    disabled: 'text-gray-400',
  },
} as const