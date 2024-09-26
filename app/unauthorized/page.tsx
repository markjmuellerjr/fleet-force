// app/unauthorized/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-100 mb-4">Unauthorized</h1>
      <p className="text-gray-300 mb-6">
        You do not have permission to view this page.
      </p>
      <Link href="/">
        <a className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-white hover:text-gray-900 transition">Go to Home</a>
      </Link>
    </div>
  );
};

export default Unauthorized;