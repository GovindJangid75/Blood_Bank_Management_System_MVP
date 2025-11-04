const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
      <div className="absolute inset-2 rounded-full bg-red-600" />
    </div>
  </div>
);

export default Loader;


