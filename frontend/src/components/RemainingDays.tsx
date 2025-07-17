'use client';

import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { getRemainingDays } from '../services/assignmentService';
import { Eye, EyeOff } from 'lucide-react';

type RemainingDaysProps = {
  assignmentId: number;
};

export function RemainingDays({ assignmentId }: RemainingDaysProps) {
  const [show, setShow] = useState(false);

  const {
    data: remainingDays,
    loading,
    error,
  } = useApi(getRemainingDays, show, [assignmentId]);

  function handleToggle() {
    setShow((prev) => !prev);
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={handleToggle}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title={show ? "Hide remaining days" : "Show remaining days"}
      >
        {show ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
      </button>

      {loading && <span className="text-sm text-gray-500">Loading...</span>}
      {error && <span className="text-sm text-red-500">Error</span>}
      {show && remainingDays !== null && !loading && !error && (
        <span className="text-sm text-gray-800">{remainingDays} days left</span>
      )}
    </div>
  );
}
