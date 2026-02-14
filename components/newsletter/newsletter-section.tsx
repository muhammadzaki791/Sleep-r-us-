'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSectionProps {
  variant?: 'default' | 'hero' | 'footer';
}

const NewsletterSection = ({ variant = 'default' }: NewsletterSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source: variant,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHeroVariant = variant === 'hero';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`
        ${isHeroVariant
          ? 'bg-gradient-to-r from-[#0B3D91] to-[#1A5BB8] text-white rounded-2xl p-8 md:p-12 shadow-xl'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100'
        }
      `}
    >
      <div className="max-w-2xl mx-auto text-center">
        {!isHeroVariant && (
          <div className="w-12 h-12 bg-[#0B3D91] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-white" />
          </div>
        )}

        <h2 className={`
          text-2xl md:text-3xl font-bold mb-4
          ${isHeroVariant ? 'text-white' : 'text-[#0B3D91]'}
        `}>
          {isHeroVariant ? 'Stay Updated' : 'Join Our Newsletter'}
        </h2>

        <p className={`
          mb-6 max-w-md mx-auto
          ${isHeroVariant ? 'text-blue-100' : 'text-gray-600'}
        `}>
          {isHeroVariant
            ? 'Subscribe to get the latest product updates and special offers.'
            : 'Subscribe to our newsletter for the latest products and offers.'
          }
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex flex-col items-center justify-center ${isHeroVariant ? 'text-white' : 'text-green-600'}`}
          >
            <CheckCircle className="h-12 w-12 mb-3" />
            <p className="text-lg font-medium">Thank you for subscribing!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`
                    w-full px-4 py-3 rounded-lg border ${
                      isHeroVariant
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A5BB8]'
                    }
                  `}
                  {...register('email')}
                />
                {errors.email && (
                  <p className={`mt-1 text-sm ${isHeroVariant ? 'text-red-200' : 'text-red-500'}`}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap
                  ${isHeroVariant
                    ? 'bg-white text-[#0B3D91] hover:bg-gray-100 shadow-md hover:shadow-lg'
                    : 'bg-[#0B3D91] text-white hover:bg-[#082a69] shadow-md hover:shadow-lg'
                  }
                `}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {error && (
              <p className={`mt-2 text-sm ${isHeroVariant ? 'text-red-200' : 'text-red-500'}`}>
                {error}
              </p>
            )}
          </form>
        )}

        <p className={`
          mt-4 text-sm max-w-xs mx-auto
          ${isHeroVariant ? 'text-blue-200' : 'text-gray-500'}
        `}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterSection;