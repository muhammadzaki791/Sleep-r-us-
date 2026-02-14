"use client";

import { useState } from "react";
import { ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What materials are your mattresses made from?",
      answer:
        "Our premium mattresses feature high-quality materials including memory foam, pocket springs, and natural latex. We prioritize eco-friendly and hypoallergenic materials for superior comfort and health benefits.",
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer:
        "Standard delivery takes 5-7 business days. For custom orders, please allow 2-3 weeks for production before shipping. Express delivery options are available for an additional fee.",
    },

    {
      id: 3,
      question: "Do you offer delivery and installation?",
      answer:
        "Yes, we provide home delivery, and installation is available on request.",
    },
    {
      id: 4,
      question: "How often should I replace my mattress?",
      answer:
        "On average, a mattress should be replaced every 7–10 years for proper comfort and hygiene.",
    },

    {
      id: 5,
      question: "Can I customize my bed frame?",
      answer:
        "Absolutely! We offer custom sizing, finish options, and design modifications for our bed frames. Contact our team to discuss your specific requirements and get a personalized quote.",
    },
    {
      id: 6,
      question: "How do I maintain my mattress?",
      answer:
        "We recommend rotating your mattress every 3 months for even wear. Use a protective cover to prevent stains, and spot clean with mild soap and water as needed. Avoid harsh chemicals.",
    },
    {
      id: 7,
      question: "Are your products eco-friendly?",
      answer:
        "Yes, we're committed to sustainability. Our materials are sourced responsibly, and we use eco-friendly foams and adhesives. Our packaging is recyclable, and we support environmental initiatives.",
    },
    {
      id: 8,
      question: "What payment options do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payments including PayPal and Apple Pay. We also offer financing options through our partner providers for qualifying purchases.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Visual Section */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/10 to-[#1A5BB8]/10 rounded-3xl transform rotate-1 scale-105"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#0B3D91] mb-6 leading-tight">
                  Frequently Asked Questions
                </h1>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Find answers to common questions about our products, services,
                  and policies. Still have questions? We're here to help.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Phone className="w-5 h-5 text-[#0B3D91]" />
                    <span className="font-medium text-gray-700">
                      +44 113 403 6673
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Mail className="w-5 h-5 text-[#0B3D91]" />
                    <span className="font-medium text-gray-700">
                      enquiries@sleeprus.co.uk
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0B3D91] to-[#1A5BB8] text-white font-semibold rounded-xl hover:from-[#082a69] hover:to-[#164a96] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Need More Help?
                  <ChevronDown className="w-5 h-5 ml-2 transform rotate-90" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col justify-center mt-4">
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]/20 rounded-xl"
                    aria-expanded={openFaq === faq.id}
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0B3D91] transition-transform duration-300 ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
