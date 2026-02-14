'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  headline: string;
  message: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <Card className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {testimonial.headline}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          "{testimonial.message}"
        </p>

        <div className="text-sm font-medium text-gray-900">
          {testimonial.name}
        </div>
      </CardContent>
    </Card>
  );
}