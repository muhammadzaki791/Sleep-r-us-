"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "../lib/client";
import { getHomepageContentQuery } from "../lib/client/queries";
import ProductGrid from "../components/product/product-grid";
import WhatsAppButton from "../components/whatsapp-button/whatsapp-button";
import TypewriterEffect from "../components/ui/typewriter-effect";
import NewsletterSection from "../components/newsletter/newsletter-section";
import { FadeIn, StaggerContainer, StaggerItem } from "../lib/animations";
import CategoryShowcaseWrapper from "./category-showcase-wrapper";

interface SizeOption {
  sizeName: string;
  dimensions: string;
  price: string;
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  showcaseSubtitle?: string;
  showcaseImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    _type?: string;
    crop?: any;
  };
}

interface PortableTextBlock {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    text: string;
  }[];
  markDefs: any[];
  style: string;
}

interface BaseProduct {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  images: any[];
  comfortLevel?: string;
  category?: Category;
  description: PortableTextBlock[];
  priceContact: string;
}

interface MattressProduct extends BaseProduct {
  _type: "mattress";
  thickness?: number;
  sizes: SizeOption[];
}

interface BedProduct extends BaseProduct {
  _type: "bed";
  sizes: SizeOption[];
}

type Product = MattressProduct | BedProduct;

interface HomePageContent {
  featuredProducts: Product[];
}

export default function HomepageContentWrapper() {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState("/bg-1.jpeg"); // Initial background image
  const images = [
    "/bg-2.jpeg",
    "/bg-3.jpeg",
    "/bg-1.jpeg",
  ]; // Array of images for background

  useEffect(() => {
    // Set interval to change background image every 5 seconds
    const interval = setInterval(() => {
      setBgImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length; // Cycle through images
        return images[nextIndex];
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(getHomepageContentQuery);
        setContent(data);
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
          <p className="mt-4 text-[#0B3D91]">Loading...</p>
        </div>
      </div>
    );
  }

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      headline: "Best Mattress I've Ever Owned",
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
      headline: "Perfect for Our Guest Room",
      message:
        "We purchased this bed frame for our guest room, and our visitors always comment on how comfortable it is.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <StaggerContainer>
        {/* Hero Section */}
        <section
          className="relative flex items-center py-16 px-4 bg-gradient-to-br from-[#0B3D91] via-[#1A5BB8] to-[#2C70D3] text-white overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover", // Scaled to fill the entire container
            backgroundPosition: "center", // Keeps the focal point centered
            backgroundRepeat: "no-repeat", // Prevents tiling if the container grows

            /* Dimensions are crucial for visibility */
            width: "100%",
            minHeight: "100vh", // Ensures it covers at least the full screen height

            /* Note: 'fixed' often fails on mobile/iOS */
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl">
              <FadeIn>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 text-left"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Your sleep starts
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                      <TypewriterEffect
                        texts={[
                          "here",
                          "with quality",
                          "with comfort",
                          "with Sleep R Us",
                        ]}
                        speed={100}
                        pauseDuration={1500}
                      />
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl mb-10 opacity-90 text-left"
                >
                  Discover premium beds and mattresses for the perfect night's
                  rest
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-start items-start"
                >
                  <Link
                    href="/products"
                    className="group relative inline-flex items-center justify-center bg-white text-[#0B3D91] hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span className="relative z-10">Shop Products</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 font-medium py-4 px-8 rounded-full text-lg transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-4xl font-bold text-center text-[#0B3D91] mb-12">
                Featured Products
              </h2>
            </FadeIn>

            <FadeIn>
              {content?.featuredProducts &&
              content.featuredProducts.length > 0 ? (
                <ProductGrid products={content.featuredProducts.slice(0, 4)} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No featured products available at the moment.
                  </p>
                </div>
              )}
            </FadeIn>

            <FadeIn>
              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-block bg-[#0B3D91] hover:bg-[#082a69] text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
        {/* Shop by Category */}
        <CategoryShowcaseWrapper title="Curated Styles for Every Bedroom" />

        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Visual Side: Stacked Image Effect */}
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2">
                  <img
                    src="/about-pic.jpg"
                    alt="Luxury bedroom design"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Decorative Background Element */}
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#0B3D91]/5 rounded-2xl -z-0"></div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-[#0B3D91]/10 text-[#0B3D91] text-sm font-bold tracking-widest uppercase">
                  Our Philosophy
                </div>
                <h2 className="text-4xl font-bold text-[#0B3D91] leading-tight">
                  Crafting the Foundation of Your <br />
                  <span className="italic font-serif text-gray-400">
                    Perfect Morning.
                  </span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At Sleep R Us, we don’t just sell beds; we curate the
                  sanctuary where your day begins. With over a decade of
                  expertise in sleep science and luxury comfort, we help you
                  discover the mattress that feels like it was made just for
                  you.
                </p>
                <div className="pt-4">
                  <a
                    href="/about"
                    className="inline-flex items-center text-[#0B3D91] font-bold border-b-2 border-[#0B3D91] pb-1 hover:text-blue-700 hover:border-blue-700 transition-all group"
                  >
                    Learn Our Story
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-extrabold text-[#0B3D91] mb-4">
                Why Choose Sleep-R-Us ?
              </h2>
              <p className="text-lg text-gray-600">
                We are dedicated to providing more than just mattresses; we
                deliver tailored sleep solutions and unparalleled service you
                can rely on.
              </p>
            </div>

            {/* Value Proposition Grid */}
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1: Free & Fast Delivery */}
              <div className="text-center p-6 bg-slate-50 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-[#0B3D91] rounded-full text-white">
                  {/* Shipping Truck Icon for Logistics */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M.002 9.873a1 1 0 011.002-.873h17.992a1 1 0 01.996 1.144l-1.558 7.375A.998.998 0 0117.436 18H2.568a.998.998 0 01-.994-.863l-1.55-7.382a1 1 0 01.002-.882zM4 14h12l1-4H3l1 4zm13-7V4a2 2 0 00-2-2H5a2 2 0 00-2 2v3h14zM5 4h10v3H5V4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-[#0B3D91] mb-2">
                  Free & Fast Delivery
                </h4>
                <p className="text-gray-500 text-sm">
                  Enjoy hassle-free delivery and setup of your new mattress
                  right to your door nationwide.
                </p>
              </div>

              {/* Feature 2: Quality & Durability */}
              <div className="text-center p-6 bg-slate-50 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-[#0B3D91] rounded-full text-white">
                  {/* Checkmark Icon for Quality (Corrected) */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-[#0B3D91] mb-2">
                  Premium Quality Materials
                </h4>
                <p className="text-gray-500 text-sm">
                  We use only durable, non-toxic materials engineered for
                  longevity and exceptional comfort.
                </p>
              </div>

              {/* Feature 3: Long-term Peace of Mind */}
              <div className="text-center p-6 bg-slate-50 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-[#0B3D91] rounded-full text-white">
                  {/* Shield Icon for Warranty */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1.25a7.75 7.75 0 00-7.75 7.75c0 4.125 2.671 7.64 6.335 8.924a1.25 1.25 0 00.83.003c3.665-1.284 6.335-4.8 6.335-8.927A7.75 7.75 0 0010 1.25zm.875 5.5a.75.75 0 00-1.5 0v3a.75.75 0 00.75.75h3.25a.75.75 0 000-1.5h-2.5v-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-[#0B3D91] mb-2">
                  Comprehensive Warranty
                </h4>
                <p className="text-gray-500 text-sm">
                  All our products are covered by an extensive guarantee against
                  manufacturing faults, giving you peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Soft background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-20">
                <span className="text-[#0B3D91] font-bold tracking-[0.2em] text-xs uppercase bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">
                  Support Center
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] mb-6 tracking-tight">
                  Common Inquiries
                </h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                  Everything you need to know about your journey to better
                  sleep.
                </p>
              </div>
            </FadeIn>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "What materials are your mattresses made from?",
                  answer:
                    "Our premium mattresses feature high-quality materials including memory foam, pocket springs, and natural latex. We prioritize eco-friendly and hypoallergenic materials for superior comfort and health benefits.",
                },
                {
                  question: "How long does shipping take?",
                  answer:
                    "Standard delivery takes 5-7 business days. For custom orders, please allow 2-3 weeks for production before shipping. Express delivery options are available for an additional fee.",
                },

                {
                  question: "Do you offer delivery and installation?",
                  answer:
                    "Yes, we provide home delivery, and installation is available on request.",
                },
                {
                  question: "How often should I replace my mattress?",
                  answer:
                    "On average, a mattress should be replaced every 7–10 years for proper comfort and hygiene.",
                },
              ].map((faq, index) => (
                <FadeIn key={index}>
                  <div className="group border border-gray-100 bg-[#FBFDFF] rounded-2xl transition-all duration-300 hover:border-blue-200 hover:shadow-sm">
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between w-full p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0B3D91] transition-colors pr-8">
                          {faq.question}
                        </h3>
                        <div className="relative flex-shrink-0 w-6 h-6">
                          {/* Modern Plus/Minus Icon */}
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#0B3D91] rounded-full transition-transform duration-300" />
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#0B3D91] rounded-full transition-transform duration-300 group-open:rotate-0 rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-8">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <div className="text-center mt-16">
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-2 font-bold text-[#0B3D91] group border-b-2 border-transparent hover:border-[#0B3D91] transition-all pb-1"
                >
                  Explore the full Help Center
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
          {/* Decorative subtle background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100 blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-[#0B3D91] uppercase bg-blue-50 rounded-full">
                  Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] mb-6 tracking-tight">
                  What Our Customers Are Says
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  Join the thousands who have upgraded their lifestyle with our
                  premium sleep solutions.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <FadeIn key={testimonial.id}>
                  <div className="group h-full p-8 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,61,145,0.08)] transition-all duration-500 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-[#0B3D91] mb-3 group-hover:text-[#1A5BB8] transition-colors">
                        "{testimonial.headline}"
                      </h3>
                      <p className="text-gray-600 leading-relaxed italic">
                        {testimonial.message}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0B3D91] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>

            <FadeIn>
              <div className="text-center mt-16">
                <Link
                  href="/testimonials"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0B3D91] text-white font-bold rounded-2xl hover:bg-[#1A5BB8] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  View All Reviews
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <FadeIn>
              <NewsletterSection />
            </FadeIn>
          </div>
        </section>

        {/* WhatsApp Floating Button */}
        <WhatsAppButton message="Hello, I'm interested in your products. Can you provide more information?" />
      </StaggerContainer>
    </div>
  );
}
