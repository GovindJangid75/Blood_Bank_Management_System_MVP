import { useState } from 'react';
import Navbar from '../common/Navbar';
import { useToast } from '../../context/ToastContext';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { add } = useToast();

  const submit = (e) => {
    e.preventDefault();
    add('Message sent! We will get back to you soon.', { type: 'success' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h1>
          <form className="space-y-4" onSubmit={submit}>
            <input className="input-field" placeholder="Your Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
            <input className="input-field" type="email" placeholder="Your Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
            <textarea className="input-field" rows={4} placeholder="Your Message" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required />
            <button type="submit" className="btn-primary">Send</button>
          </form>
        </div>
        <div className="card p-0 overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086178273247!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5d3a!2sBlood%20Bank!5e0!3m2!1sen!2sus!4v1610000000000"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '320px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;


