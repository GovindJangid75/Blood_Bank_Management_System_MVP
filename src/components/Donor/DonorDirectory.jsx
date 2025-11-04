import { useEffect, useMemo, useState } from 'react';
import API from '../../utils/api';
import Navbar from '../common/Navbar';
import { useToast } from '../../context/ToastContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorCard = ({ donor }) => {
  return (
    <div className="card flex gap-4 items-center">
      <img
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(donor.user?.name || 'Donor')}`}
        alt={donor.user?.name || 'Donor'}
        className="w-16 h-16 rounded-full border"
      />
      <div className="flex-1">
        <div className="font-semibold text-gray-900 dark:text-gray-100">{donor.user?.name || 'Anonymous'}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{donor.address?.city || 'City'}, {donor.address?.country || ''}</div>
        <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {donor.bloodType}
        </div>
      </div>
      <div className="text-right">
        {donor.user?.email && (
          <a className="link block" href={`mailto:${donor.user.email}`}>Email</a>
        )}
        {donor.emergencyContact?.phone && (
          <a className="link block" href={`https://wa.me/${donor.emergencyContact.phone}`} target="_blank" rel="noreferrer">WhatsApp</a>
        )}
      </div>
    </div>
  );
};

const DonorDirectory = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [blood, setBlood] = useState('');
  const [city, setCity] = useState('');
  const { add } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/donors');
        setDonors(res.data.data || []);
      } catch (e) {
        add('Failed to load donors', { type: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [add]);

  const cities = useMemo(() => {
    return Array.from(new Set((donors || []).map(d => d.address?.city).filter(Boolean)));
  }, [donors]);

  const filtered = useMemo(() => {
    return donors.filter(d => {
      const matchesBlood = !blood || d.bloodType === blood;
      const matchesCity = !city || (d.address?.city || '').toLowerCase() === city.toLowerCase();
      const matchesQ = !q || (d.user?.name || '').toLowerCase().includes(q.toLowerCase());
      return matchesBlood && matchesCity && matchesQ;
    });
  }, [donors, blood, city, q]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Find Donor by Blood Group</h1>
            <p className="text-gray-600 dark:text-gray-300">Search and filter donors by group and location</p>
          </div>
          <a href="/blood-request" className="btn-primary">Request Blood</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            className="input-field md:col-span-2"
            placeholder="Search by name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input-field" value={blood} onChange={(e) => setBlood(e.target.value)}>
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <select className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">Loading donors...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">No donors found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => (
              <DonorCard key={d._id} donor={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDirectory;


