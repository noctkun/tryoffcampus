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
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-primary-500 hover:border-primary-400 shadow-lg"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push('/auth')}
      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-primary-500 hover:border-primary-400 shadow-lg"
    >
      Sign In
    </button>
  );
}
