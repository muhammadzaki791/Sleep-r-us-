'use client'

import { useEffect } from 'react'
import Image from 'next/image'

const WhatsAppButton = ({ message = "Hello, I'm interested in your products!" }: { message?: string }) => {
  useEffect(() => {
    // Add styles for the floating button
    const style = document.createElement('style')
    style.textContent = `
      .whatsapp-float {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src="/whatsApp-icon.png"
        alt="Contact us on WhatsApp"
        width={32}
        height={32}
        className="drop-shadow-sm"
      />
    </a>
  )
}

export default WhatsAppButton