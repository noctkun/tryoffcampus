import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '../components/Dashboard';

export default function DashboardPage({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to sign in to view your dashboard.
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="btn-primary"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard user={user} />;
}
