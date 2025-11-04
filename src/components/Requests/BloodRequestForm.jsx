import { useState } from 'react';
import Navbar from '../common/Navbar';
import API from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const BloodRequestForm = () => {
  const [form, setForm] = useState({ name: '', bloodType: '', urgency: 'medium', contact: '' });
  const [loading, setLoading] = useState(false);
  const { add } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/requests', {
        patientDetails: { name: form.name, bloodType: form.bloodType, urgency: form.urgency },
        contact: form.contact,
      });
      add("We'll reach you soon", { type: 'success' });
      setForm({ name: '', bloodType: '', urgency: 'medium', contact: '' });
    } catch (e) {
      add(e.response?.data?.message || 'Failed to submit request', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blood Request</h1>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input className="input-field" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Group Needed</label>
                <select className="input-field" value={form.bloodType} onChange={(e)=>setForm({...form,bloodType:e.target.value})} required>
                  <option value="">Select</option>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Urgency</label>
                <select className="input-field" value={form.urgency} onChange={(e)=>setForm({...form,urgency:e.target.value})}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact</label>
              <input className="input-field" value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} required />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Submitting...' : 'Submit Request'}</button>
              <a href="/donors" className="link">Find a donor directly</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestForm;


