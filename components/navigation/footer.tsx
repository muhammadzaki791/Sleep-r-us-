"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import NewsletterSection from "../newsletter/newsletter-section";
import { FadeIn, StaggerContainer, StaggerItem } from "../../lib/animations";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const showNewsletter = pathname !== "/";

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "Mattresses", href: "/products/mattresses" },
        { name: "Bed Frames", href: "/products/bed-frames" },
        { name: "All Products", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/faqs" },
        { name: "Testimonials", href: "/testimonials" },
      ],
    },
  ] as const;

  return (
    <footer className="bg-gradient-to-br from-[#0B3D91] to-[#1A5BB8] h-full text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* Company Info */}
          <StaggerItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white rounded-full">
                  <Image
                    src="/logo.png"
                    alt="Sleep R Us Logo"
                    width={80}
                    height={80}
                    loading="eager"
                    className="object-cover p-1 w-15 h-15"
                  />
                </div>
                <span className="text-xl font-bold text-xl text-white">
                  Sleep R Us
                </span>
              </div>
              <p className="text-blue-100 mb-4">
                Your sleep starts here. Premium beds and mattresses for the
                perfect night's rest.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <StaggerItem key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href as any}
                        className="text-blue-100 hover:text-white transition-colors duration-300 block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:hidden"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Stay Updated
                </h3>
                <p className="text-blue-100 mb-4">
                  Subscribe to our newsletter for the latest products and
                  offers.
                </p>
                <NewsletterSection variant="footer" />
              </motion.div>
            </StaggerItem>
          )}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-blue-400/30 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} Sleep R Us. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
