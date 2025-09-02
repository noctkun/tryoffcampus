import { useRouter } from 'next/router';
import { signOut } from '../lib/supabase';

export default function AuthButton({ user }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (user) {
    return (
      <button
        onClick={handleSignOut}
        className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-black hover:border-gray-900 shadow-lg"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push('/auth')}
      className="bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-black dark:border-white hover:border-gray-900 shadow-lg"
    >
      Sign In
    </button>
  );
}
