import React from 'react';
import { format } from 'date-fns';

interface Props {
  date: string;
  onChange: (date: string) => void;
}

export default function DateSelector({ date, onChange }: Props) {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Game Date</h3>
      <input
        type="date"
        value={formattedDate}
        onChange={(e) => onChange(new Date(e.target.value).toISOString())}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}