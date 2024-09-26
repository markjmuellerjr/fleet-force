// app/auth/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signup: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Client', // Default role
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Redirect to sign-in page after successful signup
      router.push('/auth/signin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-16 rounded-lg shadow-md w-full max-w-lg h-full max-h-2xl glass"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 dark:text-gray-200 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-900 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 dark:text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-900 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 dark:text-gray-200 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-900 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        {/*
        <div className="mb-6">
          <label htmlFor="role" className="block text-gray-300 dark:text-gray-200 mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-900 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        */}
        <button
          type="submit"
          disabled={loading}
          className="w-full m-x-4 py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-white hover:text-gray-900 transition-colors disabled:bg-gray-900"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-300">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-gray-300 hover:underline">
            Sign In
          </Link>
        </p>
    </div>
  );
};

export default Signup;