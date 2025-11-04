import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { formatDate, getStatusColor } from '../../utils/helpers';
import Navbar from '../common/Navbar';

const HospitalDashboard = () => {
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    try {
      // Get hospital profile
      const hospitalRes = await API.get('/hospitals');
      const hospital = hospitalRes.data.data.find(h => h.user._id === JSON.parse(localStorage.getItem('user'))._id);
      setHospitalProfile(hospital);

      // Get requests for this hospital
      const requestsRes = await API.get('/requests');
      const hospitalRequests = requestsRes.data.data.filter(r => r.hospital._id === hospital?._id);
      setRecentRequests(hospitalRequests.slice(0, 5));

      setStats({
        totalRequests: hospitalRequests.length,
        pendingRequests: hospitalRequests.filter(r => r.status === 'pending').length,
        approvedRequests: hospitalRequests.filter(r => r.status === 'approved').length
      });
    } catch (error) {
      console.error('Error fetching hospital data:', error);
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
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-600">{hospitalProfile?.name || 'Hospital Management'}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hospitalProfile ? (
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Hospital Profile</h2>
            <p className="text-gray-600 mb-6">To start requesting blood units, please complete your hospital profile.</p>
            <button
              onClick={() => navigate('/hospital-registration')}
              className="btn-primary"
            >
              Complete Profile
            </button>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalRequests}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingRequests}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Approved Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.approvedRequests}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Blood Requests</h2>
                <button
                  onClick={() => navigate('/requests')}
                  className="btn-primary"
                >
                  View All
                </button>
              </div>

              {recentRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No blood requests yet</p>
                  <button
                    onClick={() => navigate('/new-request')}
                    className="btn-primary"
                  >
                    Create First Request
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Request ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urgency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentRequests.map((request) => (
                        <tr key={request._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.requestId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.patientDetails.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.patientDetails.bloodType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.patientDetails.urgency)}`}>
                              {request.patientDetails.urgency}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(request.requestedDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                              {request.status}
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
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Blood Request</h3>
                <p className="text-gray-600 mb-4">Request blood units for a patient</p>
                <button
                  onClick={() => navigate('/new-request')}
                  className="btn-primary w-full"
                >
                  Create Request
                </button>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">View Requests</h3>
                <p className="text-gray-600 mb-4">Track all your blood requests</p>
                <button
                  onClick={() => navigate('/requests')}
                  className="btn-primary w-full"
                >
                  View Requests
                </button>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Profile</h3>
                <p className="text-gray-600 mb-4">Update hospital information</p>
                <button
                  onClick={() => navigate('/hospital-profile')}
                  className="btn-primary w-full"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
