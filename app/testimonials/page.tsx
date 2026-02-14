"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, StaggerContainer } from "../../lib/animations";
import WhatsAppButton from "@/components/whatsapp-button/whatsapp-button";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  headline: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    headline: "Best Mattress Ever",
    message:
      "After years of struggling with back pain, this mattress has completely transformed my sleep. The comfort and support are unmatched.",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    headline: "Luxurious Comfort",
    message:
      "The quality and craftsmanship exceeded my expectations. The attention to detail is remarkable and customer service was exceptional.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    headline: "Perfect for Guests",
    message:
      "We purchased this bed frame for our guest room, and our visitors always comment on how comfortable it is. Elegant design.",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    headline: "Investment Worth It",
    message:
      "Worth every penny. The mattress has improved our sleep quality significantly, and the durability is impressive.",
  },
  {
    id: 5,
    name: "Lisa Wang",
    rating: 5,
    headline: "Exceptional Support",
    message:
      "As someone who suffers from joint pain, I was skeptical. This provides the perfect balance of comfort and support.",
  },
  {
    id: 6,
    name: "James Miller",
    rating: 4,
    headline: "Beautiful Craftsmanship",
    message:
      "The bed frame arrived beautifully packaged. The finish is stunning and has added a touch of elegance to our bedroom.",
  },
  {
    id: 7,
    name: "Jennifer Lee",
    rating: 5,
    headline: "Sleep Game Changer",
    message:
      "Nothing compares to this. The temperature regulation and pressure relief are incredible for deep, restorative sleep.",
  },
  {
    id: 8,
    name: "Robert Davis",
    rating: 5,
    headline: "Premium Materials",
    message:
      "Natural materials give me peace of mind knowing my family is sleeping on a healthy, sustainable, and premium product.",
  },
  {
    id: 9,
    name: "Amanda Foster",
    rating: 4,
    headline: "Perfect Fit",
    message:
      "Custom sizing options allowed us to find the perfect fit for our layout. The design team was helpful in guiding us.",
  },
  {
    id: 10,
    name: "Thomas Wilson",
    rating: 5,
    headline: "Outstanding Experience",
    message:
      "From consultation to delivery, the experience was seamless. Their expertise helped us select the perfect mattress.",
  },
  {
    id: 11,
    name: "Sophia Garcia",
    rating: 5,
    headline: "Like Sleeping on a Cloud",
    message:
      "The plush top feels incredible while still providing the core support my spine needs. I haven't slept this well in a decade.",
  },
  {
    id: 12,
    name: "Marcus Wright",
    rating: 5,
    headline: "Solid & Silent Frame",
    message:
      "The bed frame is rock solid. No squeaks, no movement, just pure stability and a gorgeous aesthetic that anchors the room.",
  },
];

// Refined Internal Component for the Card
const StyledTestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => (
  <div className="h-full p-6 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
    <div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <h3 className="text-lg font-bold text-[#0B3D91] mb-2 group-hover:text-[#1A5BB8] transition-colors line-clamp-1">
        {testimonial.headline}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed italic">
        "{testimonial.message}"
      </p>
    </div>
    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#0B3D91] to-[#1A5BB8] rounded-full flex items-center justify-center text-white font-bold text-xs">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          Verified Customer
        </p>
      </div>
    </div>
  </div>
);

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-[#0B3D91] uppercase bg-blue-50 rounded-full border border-blue-100">
              Community Love
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0B3D91] mb-6 tracking-tight">
              What Our Customers Say
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Discover why thousands trust us for the perfect night's rest.
              High-quality materials meet exceptional craftsmanship.
            </p>
          </div>
        </FadeIn>

        {/* 4-Column Grid for Desktop */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <StyledTestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA Section */}
        <FadeIn>
          <div className="mt-20 text-center bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B3D91] mb-4">
              Join the Sleep Revolution
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Ready to upgrade your lifestyle? Browse our award-winning
              collection of mattresses and bed frames.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-10 py-4 bg-[#0B3D91] text-white font-bold rounded-xl hover:bg-[#1A5BB8] transition-all shadow-lg hover:shadow-blue-900/20"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 bg-white text-[#0B3D91] border-2 border-[#0B3D91]/10 font-bold rounded-xl hover:border-[#0B3D91] transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </FadeIn>

        <WhatsAppButton message="Hello! I've seen your testimonials and I'm interested in your products." />
      </div>
    </div>
  );
}
