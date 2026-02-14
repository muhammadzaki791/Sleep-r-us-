'use client';

import { motion } from 'framer-motion';
import TestimonialCard from './testimonial-card';
import { FadeIn, StaggerContainer } from '../../lib/animations';

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
    headline: "Best Mattress I've Ever Owned",
    message: "After years of struggling with back pain, this mattress has completely transformed my sleep. The comfort and support are unmatched, and I wake up feeling refreshed every morning."
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    headline: "Luxurious Comfort",
    message: "The quality and craftsmanship exceeded my expectations. The attention to detail is remarkable, and the customer service was exceptional throughout the entire process."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    headline: "Perfect for Our Guest Room",
    message: "We purchased this bed frame for our guest room, and our visitors always comment on how comfortable it is. The design is elegant and complements our decor perfectly."
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    headline: "Investment Worth Making",
    message: "Worth every penny spent. The mattress has improved our sleep quality significantly, and the durability is impressive. Highly recommend for anyone seeking quality rest."
  },
  {
    id: 5,
    name: "Lisa Wang",
    rating: 5,
    headline: "Exceptional Support",
    message: "As someone who suffers from joint pain, I was skeptical about finding the right mattress. This one provides the perfect balance of comfort and support I needed."
  },
  {
    id: 6,
    name: "James Miller",
    rating: 4,
    headline: "Beautiful Craftsmanship",
    message: "The bed frame arrived beautifully packaged and was easy to assemble. The finish is stunning and has added a touch of elegance to our bedroom."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D91] mb-4">
              Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What our customers say about their experience with our premium beds and mattresses
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {testimonials.slice(3, 5).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}