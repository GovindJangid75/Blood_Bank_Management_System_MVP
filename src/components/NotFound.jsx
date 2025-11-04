const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
        <a href="/login" className="mt-6 inline-block btn-primary">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;


