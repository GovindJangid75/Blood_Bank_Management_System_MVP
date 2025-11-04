import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const add = useCallback((message, options = {}) => {
    const id = ++idCounter;
    const toast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration ?? 3000
    };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration > 0) {
      const timeoutId = setTimeout(() => remove(id), toast.duration);
      timeoutsRef.current.set(id, timeoutId);
    }
    return id;
  }, [remove]);

  const value = useMemo(() => ({ add, remove }), [add, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-0 pointer-events-none flex items-start justify-center p-4 sm:p-6 z-[1000]">
        <div className="w-full max-w-sm space-y-3">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-3 shadow bg-white ${
                t.type === 'success' ? 'border-green-200' : t.type === 'error' ? 'border-red-200' : 'border-gray-200'
              }`}
            >
              <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                t.type === 'success' ? 'bg-green-500' : t.type === 'error' ? 'bg-red-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1 text-sm text-gray-800">{t.message}</div>
              <button
                onClick={() => remove(t.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;


