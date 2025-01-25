import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2022', value: 1.2 },
  { year: '2024', value: 1.8 },
  { year: '2026', value: 2.3 },
  { year: '2028', value: 2.9 },
  { year: '2030', value: 3.5 },
];

export const MarketChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name="Market Size (Billion $)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};