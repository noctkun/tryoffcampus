import { useRouter } from 'next/router';
import { Briefcase, Coffee, AlertCircle } from 'lucide-react';

export default function LandingPage({ user }) {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
              Welcome to the <span className="text-primary-600 drop-shadow-lg">Unemployment Olympics</span>! 🏆
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-primary-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Where every rejection is a medal and your LinkedIn DMs are drier than your bank account! 
              Don't worry, we've all been there - refreshing job boards like it's our full-time job.
            </p>
            
            {/* Humorous Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              <div className="card">
                <Coffee className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Coffee Consumed</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">∞</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Gallons during job hunts</p>
              </div>
              
              <div className="card">
                <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">"Entry Level" Jobs</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">404</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Requiring 5+ years experience</p>
              </div>
              
              <div className="card sm:col-span-2 lg:col-span-1">
                <Briefcase className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Dream Job Status</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">Still Dreaming</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">But we're working on it!</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <button
                onClick={() => router.push('/jobs')}
                className="btn-primary w-full sm:w-auto text-center"
              >
                Get Started (Before Your Parents Ask Again)
              </button>
              
              <button
                onClick={() => router.push('/auth')}
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Sign Up (It's Free, Unlike College)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-950 py-16 sm:py-20 border-t dark:border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose tryoffcampus?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-primary-300 px-4">
              Because misery loves company, and we're all in this together! 😅
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Fresh Job Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Updated daily, unlike your motivation to apply to jobs.
              </p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Application History
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Track your rejections... I mean, track your progress!
              </p>
            </div>
            
            <div className="card text-center md:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Dark Mode Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                For when you're job hunting at 3 AM (again).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
