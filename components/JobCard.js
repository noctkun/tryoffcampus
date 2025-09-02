import { Building, MapPin, Clock } from 'lucide-react';
import { saveJobToHistory } from '../lib/supabase';

export default function JobCard({ companyName, jobData, user }) {
  const handleLinkClick = async (linkType, url) => {
    if (user && url) {
      try {
        const { YearsOfExperience, salary, ...jobDataWithoutYoe } = jobData || {};
        await saveJobToHistory(user.id, {
          CompanyName: companyName,
          ...jobDataWithoutYoe
        });
      } catch (error) {
        console.error('Error saving job to history:', error);
      }
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="card card-glow hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white truncate">
              {companyName}
            </h3>
            {jobData.TimeStamp && (
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock size={12} className="mr-1 flex-shrink-0" />
                {new Date(jobData.TimeStamp).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - This will grow to fill available space */}
      <div className="flex-grow mb-4 sm:mb-6">
        <div className="space-y-2">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {jobData.Role}
          </h4>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{jobData.Location}</span>
          </p>
          
          {/* Experience Section - Always allocate space */}
          <div className="min-h-[1.5rem]">
            {typeof jobData.YearsOfExperience !== 'undefined' && (
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Experience: <span className="font-medium">{jobData.YearsOfExperience} year{jobData.YearsOfExperience === 1 ? '' : 's'}</span>
              </p>
            )}
          </div>
          
          {/* Salary Section - Always allocate space */}
          <div className="min-h-[1.5rem]">
            {jobData.salary && (
              <p className="text-sm sm:text-base text-green-700 dark:text-green-400 font-medium">
                💰 {jobData.salary}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Button Section - Always at bottom */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
        <button
          onClick={() => handleLinkClick('apply', jobData.Applylink)}
          disabled={!jobData.Applylink}
          className="flex-1 bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          Apply
        </button>
        <button
          onClick={() => handleLinkClick('about', jobData.Aboutlink)}
          disabled={!jobData.Aboutlink}
          className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200 py-2.5 sm:py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          About
        </button>
      </div>
    </div>
  );
}
