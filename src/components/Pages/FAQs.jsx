import { useState } from 'react';
import Navbar from '../common/Navbar';

const faqs = [
  { q: 'Is blood donation safe?', a: 'Yes. Sterile, disposable equipment is used for each donor.' },
  { q: 'How long does it take?', a: 'About 10-15 minutes for donation; 45-60 minutes including screening.' },
  { q: 'How often can I donate?', a: 'Typically every 56 days for whole blood.' },
];

const FAQs = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">FAQs</h1>
        <div className="space-y-2">
          {faqs.map((item, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden dark:border-gray-800">
              <button className="w-full text-left px-4 py-3 bg-white dark:bg-gray-900" onClick={()=>setOpen(open===idx?-1:idx)}>
                <span className="font-medium text-gray-900 dark:text-gray-100">{item.q}</span>
              </button>
              {open === idx && (
                <div className="px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;


