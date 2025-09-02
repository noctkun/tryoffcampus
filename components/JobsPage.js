import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import JobCard from './JobCard';
import { Search, Filter } from 'lucide-react';

export default function JobsPage({ user }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const router = useRouter();

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    // Apply URL filters if present
    const { field, role, location } = router.query;
    if (field || role || location) {
      let searchQuery = '';
      if (field) searchQuery += field + ' ';
      if (role) searchQuery += role + ' ';
      setSearchTerm(searchQuery.trim());
      if (location) setLocationFilter(location);
    }
  }, [router.query]);

  useEffect(() => {
    filterJobs();
    setCurrentPage(1);
  }, [jobs, searchTerm, locationFilter]);

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm || locationFilter) {
      filtered = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
          job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.Role.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = !locationFilter ||
          job.Location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesLocation;
      });
    }

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-lg text-black dark:text-white text-center">Loading amazing opportunities...</div>
      </div>
    );
  }

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const aDate = a?.TimeStamp ? new Date(a.TimeStamp).getTime() : 0;
    const bDate = b?.TimeStamp ? new Date(b.TimeStamp).getTime() : 0;
    return bDate - aDate; // Newest first
  });

  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / ITEMS_PER_PAGE));
  const currentPageClamped = Math.min(currentPage, totalPages);
  const startIdx = (currentPageClamped - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedJobs = sortedJobs.slice(startIdx, endIdx);

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Job Opportunities 🚀
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white">
            Fresh opportunities updated daily. Your next career move is just a click away!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10 pr-4"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="input-field w-full pl-10 pr-4"
              />
            </div>
          </div>
        </div>

        {/* Job Results */}
        {sortedJobs.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-white">
              Try adjusting your search criteria or check back later!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">
                Found {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginatedJobs.map((job, index) => (
                <JobCard
                  key={`${job.name}-${job.Role}-${index}`}
                  companyName={job.name}
                  jobData={job}
                  user={user}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 mt-6">
                <button
                  onClick={() => goToPage(currentPageClamped - 1)}
                  disabled={currentPageClamped <= 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPageClamped;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`${isActive ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200' : 'btn-secondary'} px-3 py-2 rounded-md text-sm`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => goToPage(currentPageClamped + 1)}
                  disabled={currentPageClamped >= totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
