// components/Navbar/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="sticky flex justify-between items-center p-6 bg-gray-900 bg-opacity-50 backdrop-blur background-blur-lg">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-white">
      <Image src="/logos/logo.png" alt="Logo" width={64} height={64} />
    </Link>
    
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-xl">
        <Link href="/about" className="text-gray-300 hover:text-white transition">
         About Us
        </Link>
        <Link href="/services" className="text-gray-300 hover:text-white transition">
         Services
        </Link>
        <Link href="/contact">
          Contact
        </Link>
        <Link href="/privacy" className="text-gray-300 hover:text-white transition">
          Privacy Policy
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle 
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="focus:outline-none"
        >
          {darkMode ? (
            <span className="h-6 w-6 text-yellow-400">☀️</span>
          ) : (
            <span className="h-6 w-6 text-gray-200">🌙</span>
          )}
        </button>
        */}

        {/* Authentication Links */}
        {status === 'loading' ? (
          <p className="text-gray-300">Loading...</p>
        ) : session ? (
          <>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="px-4 py-3 bg-white text-gray-900 rounded hover:bg-gray-900 hover:text-white border-2 border-white transition"
            >
              Sign In
            </button>
            <Link href="/signup" className="px-4 py-3 bg-gray-900 text-white rounded hover:bg-white hover:text-gray-900 border-2 border-white transition">
                Sign Up
            </Link> 
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center focus:outline-none"
          aria-label="Toggle Menu"
        >
          {/* Hamburger Icon */}
          <svg
            className="h-6 w-6 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              // X Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link href="/about" className="text-gray-300 hover:text-white transition">
            About Us
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-white transition">
            Services
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-300 hover:text-white transition">
            Privacy Policy
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
               Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-3 bg-gray-900 text-white rounded hover:bg-white hover:text-gray-900 border-2 border-white transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="px-4 py-3 bg-white text-gray-900 rounded hover:bg-gray-900 hover:text-white border-2 border-white transition"
              >
                Sign In
              </button>
              <Link href="/signup" className="px-4 py-3 bg-gray-900 text-white rounded hover:bg-white hover:text-gray-900 border-2 border-white transition">
                Sign Up
              </Link> 
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;