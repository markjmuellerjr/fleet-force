import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white flex flex-col">
      <main id="main-content" className="container mx-auto px-4 py-8 flex-grow">{children}</main>
    </div>
    </>
  );
};

export default Layout;