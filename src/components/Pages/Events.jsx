import Navbar from '../common/Navbar';

const mockEvents = [
  { date: '2025-11-15', title: 'City Blood Donation Camp', location: 'Community Hall' },
  { date: '2025-12-05', title: 'University Drive', location: 'Campus Center' },
];

const Events = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Upcoming Blood Donation Camps</h1>
      <div className="space-y-4">
        {mockEvents.map((e, i) => (
          <div key={i} className="card flex items-center justify-between">
            <div>
              <div className="text-gray-900 dark:text-gray-100 font-medium">{e.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{e.location}</div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200">{new Date(e.date).toDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Events;


