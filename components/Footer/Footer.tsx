"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-50 backdrop-blur mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-white">
            FleetForce
          </Link>
          <p className="text-gray-400 mt-2">
            Streamlining service appointments for heavy machinery dealerships.
          </p>
        </div>

        {/* Newsletter Signup */}

        <div className="mb-6 md:mb-0 text-center md:text-left">
        <h3 className="text-lg font-semibold text-white">Subscribe to our Newsletter</h3>
        <form className="mt-2 flex flex-col sm:flex-row items-center">
            <input
            type="email"
            placeholder="Your email"
            className="w-full sm:w-auto px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Email address"
            required
            />
            <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-white hover:text-gray-900 border-2 border-white transition"
            aria-label="Subscribe to newsletter"
            >
            Subscribe
            </button>
        </form>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 text-center">
          <Link className="text-gray-300 hover:text-white transition mb-2 md:mb-0" href="/about">
           About Us
          </Link>
          <Link className="text-gray-300 hover:text-white transition mb-2 md:mb-0" href="/services">
            Services
          </Link>
          <Link className="text-gray-300 hover:text-white transition mb-2 md:mb-0" href="/contact">
            Contact
          </Link>
          <Link className="text-gray-300 hover:text-white transition mb-2 md:mb-0" href="/privacy">
            Privacy Policy
          </Link>
        </div>
        
        {/* Social Media Icons */}
        <div className="mt-6 md:mt-0 flex space-x-4">
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-300 hover:text-white transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-300 hover:text-white transition"
            aria-label="Twitter"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-300 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-300 hover:text-white transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </motion.a>
        </div>
      </div>

      
      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <p className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} FleetForce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;