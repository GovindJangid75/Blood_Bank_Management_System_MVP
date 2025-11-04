import Navbar from '../common/Navbar';

const About = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Why Blood Donation Matters</h1>
        <p>
          Every donation can save up to three lives. Regular blood donation ensures hospitals have the
          supply needed for emergencies, surgeries, and treatments.
        </p>
        <ul>
          <li>Helps patients in critical need</li>
          <li>Supports cancer and surgery patients</li>
          <li>Builds community resilience</li>
        </ul>
      </div>
    </div>
  </div>
);

export default About;


