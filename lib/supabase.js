import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Function to save clicked job to user history
export async function saveJobToHistory(userId, jobData) {
  const { data, error } = await supabase
    .from('job_history')
    .insert([
      {
        user_id: userId,
        company_name: jobData.CompanyName,
        role: jobData.Role,
        location: jobData.Location,
        timestamp: jobData.TimeStamp,
        apply_link: jobData.Applylink,
        about_link: jobData.Aboutlink,
        clicked_at: new Date().toISOString()
      }
    ]);
  return { data, error };
}

// Function to get user's job history
export async function getUserJobHistory(userId) {
  const { data, error } = await supabase
    .from('job_history')
    .select('*')
    .eq('user_id', userId)
    .order('clicked_at', { ascending: false });
  return { data, error };
}
