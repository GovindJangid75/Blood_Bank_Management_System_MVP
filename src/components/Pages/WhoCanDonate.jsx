import Navbar from '../common/Navbar';

const WhoCanDonate = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Who Can Donate?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Eligibility</h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Age 18-65</li>
              <li>Weight 50kg+</li>
              <li>Good health and feeling well</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Wait Periods</h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>56 days between whole blood donations</li>
              <li>Longer after surgeries or certain medications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WhoCanDonate;


