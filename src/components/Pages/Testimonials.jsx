import Navbar from '../common/Navbar';
import { useEffect, useState } from 'react';

const testimonials = [
  { name: 'Ayesha', text: 'Donating blood was quick and fulfilling.' },
  { name: 'Rahul', text: 'My donation helped a child in need.' },
  { name: 'Sara', text: 'Great experience at the local camp!' },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <p className="text-lg text-gray-800 dark:text-gray-100">“{testimonials[index].text}”</p>
          <div className="mt-3 text-gray-600 dark:text-gray-300">— {testimonials[index].name}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;


