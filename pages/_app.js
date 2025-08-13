import { ThemeProvider } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <Layout user={user}>
        <Component {...pageProps} user={user} />
      </Layout>
    </ThemeProvider>
  );
}
