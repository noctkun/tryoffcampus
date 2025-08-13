import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase, signInWithEmail, signUpWithEmail } from '../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let result;
      if (isSignUp) {
        result = await signUpWithEmail(email, password);
      } else {
        result = await signInWithEmail(email, password);
      }

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (isSignUp) {
          setMessage('Check your email for the confirmation link!');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-primary-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-primary-300">
              Join the off-campus job hunt revolution!
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field appearance-none relative block w-full px-3 py-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field appearance-none relative block w-full px-3 py-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {message && (
              <div className={`text-sm text-center p-3 rounded-lg border ${
                message.includes('error') || message.includes('Error') 
                  ? 'text-red-600 border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'text-green-600 border-green-500 bg-green-50 dark:bg-green-900/20'
              }`}>
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Sign in')}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
