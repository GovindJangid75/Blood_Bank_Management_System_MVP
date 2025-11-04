import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { enabled, toggle } = useDarkMode();

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-gray-100">BBMS</a>
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {enabled ? '🌙' : '☀️'}
            </button>
            {user && (
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300 capitalize">{user.role}</div>
              </div>
            )}
            <button
              onClick={logout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


