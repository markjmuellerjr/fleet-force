// app/admin/page.tsx
'use client';

import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

const Admin: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="Admin">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage users, roles, and system settings here.
        </p>
        {/* Add admin functionalities here */}
      </div>
    </ProtectedRoute>
  );
};

export default Admin;