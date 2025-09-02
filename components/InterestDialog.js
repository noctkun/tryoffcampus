import { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';

export default function InterestDialog({ onClose }) {
  const [field, setField] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (field && role && location) {
      const params = new URLSearchParams({
        field: field.trim(),
        role: role.trim(),
        location: location.trim()
      });
      router.push(`/jobs?${params.toString()}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-black rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            What are you looking for?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg dark:border dark:border-transparent dark:hover:border-gray-700"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Field of Interest
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g., Software Development, Marketing"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Product Manager"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Bangalore, Mumbai, Remote"
              className="input-field w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
          <button
            onClick={handleSearch}
            disabled={!field || !role || !location}
            className="flex-1 btn-primary order-2 sm:order-1"
          >
            Search Jobs
          </button>
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 order-1 sm:order-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
