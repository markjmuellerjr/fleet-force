// app/layout.tsx

import '../styles/globals.css';
import Providers from '../components/Providers/Providers';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'FleetForce',
  description: 'Manage your heavy machinery services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white flex flex-col">
        <Providers>
          <Navbar />
          <main id="main-content" className="container mx-auto px-4 py-8 flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}