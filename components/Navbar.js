import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';

export default function Navbar({ user }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Only show admin button on login page and when no user is signed in
  const showAdminButton = !user && router.pathname === '/auth';
  
  // Hide auth button on admin pages
  const showAuthButton = !router.pathname.startsWith('/admin');

  return (
    <nav className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-primary-600 drop-shadow-lg">
                tryoffcampus
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/jobs"
              className="text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent dark:hover:border-gray-700"
            >
              Jobs
            </Link>
            
            {user && (
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent dark:hover:border-gray-700"
              >
                Dashboard
              </Link>
            )}
            
            {showAdminButton && (
              <button
                onClick={() => router.push('/admin-auth')}
                className="text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent dark:hover:border-gray-700 flex items-center"
              >
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </button>
            )}
            
            <ThemeToggle />
            {showAuthButton && <AuthButton user={user} />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white hover:text-black dark:hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/jobs"
                className="block text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              
              {user && (
                <Link
                  href="/dashboard"
                  className="block text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {showAdminButton && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/admin-auth');
                  }}
                  className="block w-full text-left text-gray-700 dark:text-white hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </span>
                </button>
              )}
              
              {showAuthButton && (
                <div className="pt-2">
                  <AuthButton user={user} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
