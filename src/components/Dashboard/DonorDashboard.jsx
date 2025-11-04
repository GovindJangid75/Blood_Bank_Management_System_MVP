import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { formatDate, calculateAge } from '../../utils/helpers';

const DonorDashboard = () => {
  const [donorProfile, setDonorProfile] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonorData();
  }, []);

  const fetchDonorData = async () => {
    try {
      // Get donor profile
      const donorRes = await API.get('/donors');
      const donor = donorRes.data.data.find(d => d.user._id === JSON.parse(localStorage.getItem('user'))._id);
      
      if (donor) {
        setDonorProfile(donor);
        
        // Check eligibility
        const eligibilityRes = await API.get(`/donors/${donor._id}/eligibility`);
        setEligibility(eligibilityRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching donor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {donorProfile?.user?.name || 'Donor'}</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!donorProfile ? (
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Donor Profile</h2>
            <p className="text-gray-600 mb-6">To start donating blood, please complete your donor profile.</p>
            <button
              onClick={() => navigate('/donor-registration')}
              className="btn-primary"
            >
              Complete Profile
            </button>
          </div>
        ) : (
          <>
            {/* Profile Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{donorProfile.user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{donorProfile.user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Blood Type</label>
                    <p className="text-gray-900">{donorProfile.bloodType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{calculateAge(donorProfile.dateOfBirth)} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Total Donations</label>
                    <p className="text-gray-900">{donorProfile.totalDonations}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Donation</label>
                    <p className="text-gray-900">
                      {donorProfile.lastDonationDate ? formatDate(donorProfile.lastDonationDate) : 'Never'}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/donor-profile')}
                    className="btn-primary"
                  >
                    Update Profile
                  </button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Eligibility</h2>
                {eligibility ? (
                  <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                      eligibility.eligible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {eligibility.eligible ? 'Eligible to Donate' : 'Not Eligible'}
                    </div>
                    {!eligibility.eligible && (
                      <p className="text-sm text-gray-600 mb-4">{eligibility.reason}</p>
                    )}
                    {eligibility.eligible && (
                      <button
                        onClick={() => navigate('/schedule-donation')}
                        className="btn-primary w-full"
                      >
                        Schedule Donation
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">Loading eligibility status...</p>
                )}
              </div>
            </div>

            {/* Donation History */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation History</h2>
              {donationHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No donation history available</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donationHistory.map((donation, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(donation.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {donation.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Profile</h3>
                <p className="text-gray-600 mb-4">Keep your information up to date</p>
                <button
                  onClick={() => navigate('/donor-profile')}
                  className="btn-primary w-full"
                >
                  Update Profile
                </button>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">View History</h3>
                <p className="text-gray-600 mb-4">Check your donation history</p>
                <button
                  onClick={() => navigate('/donation-history')}
                  className="btn-primary w-full"
                >
                  View History
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
