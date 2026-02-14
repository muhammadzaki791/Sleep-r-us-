"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SearchBar from "../search/search-bar";
import Image from "next/image";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ] as const;

  return (
    <header
      className={`fixed w-full h-16 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg py-1"
          : "bg-white py-2"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        {/* Mobile menu button - moved to left for mobile */}
        <div className="md:hidden mr-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#0B3D91]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Logo with image - Left aligned on mobile, center on desktop layout */}
        <Link href="/" className="flex items-center space-x-2">
          <div>
            <Image
              src="/logo.png"
              alt="Sleep R Us Logo"
              width={40}
              height={40}
              loading="eager"
              className="object-cover p-1 w-12 h-12"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-[#0B3D91] font-serif leading-tight">Sleep R Us</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link, index) => (
            <Link key={link.name} href={link.href}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <span className="text-[#0B3D91] hover:text-[#1A5BB8] transition-colors font-medium text-sm">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1A5BB8] transition-all group-hover:w-full"></span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Search Bar - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="hidden md:block w-48"
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t border-gray-200 mt-1 pb-2 ${
              scrolled
                ? "bg-white/80 backdrop-blur-lg shadow-lg py-1"
                : "bg-white py-2"
            }`}
          >
            <nav className="flex flex-col space-y-1 px-4 pt-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="text-[#0B3D91] hover:text-[#1A5BB8] transition-colors font-medium py-2 relative group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-4 pt-2">
              <SearchBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
