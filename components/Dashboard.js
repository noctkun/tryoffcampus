import { useEffect, useState } from 'react';
import { getUserJobHistory } from '../lib/supabase';
import { Clock, Building, MapPin } from 'lucide-react';

export default function Dashboard({ user }) {
  const [jobHistory, setJobHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadJobHistory();
    }
  }, [user]);

  const loadJobHistory = async () => {
    try {
      const { data, error } = await getUserJobHistory(user.id);
      if (error) {
        console.error('Error loading job history:', error);
      } else {
        setJobHistory(data || []);
      }
    } catch (error) {
      console.error('Error loading job history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-lg text-center">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white mt-2">
            Here's your job application journey so far.
          </p>
        </div>

        {/* Job History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Your Job History
          </h2>
          
          {jobHistory.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <Building size={48} className="mx-auto sm:w-16 sm:h-16" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                No jobs viewed yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">
                Start exploring jobs to build your history!
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {jobHistory.map((job, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {job.role}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white flex items-center mt-1">
                        <Building size={14} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{job.company_name}</span>
                      </p>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white flex items-center mt-1">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </p>
                    </div>
                    <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500 dark:text-white">
                      <p className="flex items-center sm:justify-end">
                        <Clock size={14} className="mr-2 flex-shrink-0" />
                        <span className="whitespace-nowrap">Clicked: {new Date(job.clicked_at).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                    {job.apply_link && (
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-900 dark:text-white dark:hover:text-gray-200 text-sm font-medium"
                      >
                        Apply Link →
                      </a>
                    )}
                    {job.about_link && (
                      <a
                        href={job.about_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-900 dark:text-white dark:hover:text-gray-200 text-sm font-medium"
                      >
                        About →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
