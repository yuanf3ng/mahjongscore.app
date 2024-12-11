import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Props {
  message: string;
  type: 'success' | 'error' | 'warning';
}

export function Toast({ message, type }: Props) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg animate-fade-in-up">
      <div className={`${colors[type]} p-3 rounded-lg flex items-center gap-2`}>
        {icons[type]}
        <span>{message}</span>
      </div>
    </div>
  );
}