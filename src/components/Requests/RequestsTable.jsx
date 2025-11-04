import { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import API from '../../utils/api';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const RequestsTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/requests?status=approved');
        setRows(res.data.data || []);
      } catch (e) {
        add('Failed to load requests', { type: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [add]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Approved Blood Requests</h1>
            <a href="/blood-request" className="btn-primary">Create Request</a>
          </div>
          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">No approved requests</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
                  {rows.map((r) => (
                    <tr key={r._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{r.requestId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{r.patientDetails?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{r.patientDetails?.bloodType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(r.patientDetails?.urgency)}`}>
                          {r.patientDetails?.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatDate(r.requestedDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {r.contact && (
                          <div className="space-x-3">
                            <a className="link" href={`mailto:${r.contact}`}>Email</a>
                            <a className="link" href={`https://wa.me/${r.contact}`} target="_blank" rel="noreferrer">WhatsApp</a>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsTable;


