import { XCircle } from "lucide-react";
import { useEffect } from "react";

export default function Alert({ message, onClose }: { message: string | undefined; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center justify-between min-w-[300px]"
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close alert"
        className="ml-4 text-white hover:text-gray-300 font-bold"
      >
        <XCircle/>
      </button>
    </div>
  );
}
