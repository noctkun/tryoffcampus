import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, LogOut, Building, MapPin, Clock, DollarSign, User, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    Role: '',
    Location: '',
    TimeStamp: new Date().toISOString().slice(0, 16),
    Applylink: '',
    Aboutlink: '',
    YearsOfExperience: '',
    salary: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = sessionStorage.getItem('adminAuthenticated');
    const adminIdFromStorage = sessionStorage.getItem('adminId');
    
    if (adminAuth === 'true' && adminIdFromStorage) {
      setIsAuthenticated(true);
      setAdminId(adminIdFromStorage);
    } else {
      router.push('/admin-auth');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminId');
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/admin/add-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Job added successfully!');
        setMessageType('success');
        // Reset form
        setFormData({
          name: '',
          Role: '',
          Location: '',
          TimeStamp: new Date().toISOString().slice(0, 16),
          Applylink: '',
          Aboutlink: '',
          YearsOfExperience: '',
          salary: ''
        });
      } else {
        setMessage(data.message || 'Failed to add job');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {adminId}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Add New Job
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below to add a new job posting
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              messageType === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="e.g., TechCorp"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Role *
                </label>
                <input
                  type="text"
                  name="Role"
                  required
                  value={formData.Role}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="Location"
                  required
                  value={formData.Location}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="e.g., Bangalore, Remote"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="YearsOfExperience"
                  required
                  min="0"
                  value={formData.YearsOfExperience}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="e.g., 2"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salary *
                </label>
                <input
                  type="text"
                  name="salary"
                  required
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="e.g., ₹8-12 LPA"
                />
              </div>

              {/* Timestamp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Posted Date *
                </label>
                <input
                  type="datetime-local"
                  name="TimeStamp"
                  required
                  value={formData.TimeStamp}
                  onChange={handleInputChange}
                  className="input-field w-full"
                />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apply Link *
                </label>
                <input
                  type="url"
                  name="Applylink"
                  required
                  value={formData.Applylink}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="https://company.com/apply/job"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  About/Details Link *
                </label>
                <input
                  type="url"
                  name="Aboutlink"
                  required
                  value={formData.Aboutlink}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="https://company.com/jobs/details"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 