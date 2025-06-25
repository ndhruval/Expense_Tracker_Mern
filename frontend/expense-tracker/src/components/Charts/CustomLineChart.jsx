import React from 'react';
import {XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts";
import CustomTooltip from './CustomTooltip';
import { useTheme } from '../../context/ThemeContext';

const CustomLineChart = ({ data }) => {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
    <div className={isDark ? "bg-gray-900 shadow-md rounded-lg p-2 border border-gray-700" : "bg-white shadow-md rounded-lg p-2 border border-gray-300"}>
      <p className={isDark ? "text-xs font-semibold text-purple-200 mb-1" : "text-xs font-semibold text-purple-800 mb-1"}>{payload[0].payload.category}</p>
      <p className={isDark ? "text-sm text-gray-200" : "text-sm text-gray-600"}>
        Amount: <span className={isDark ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>${payload[0].payload.amount}</span>
      </p>
    </div>
  );

  }
  return null;
  };

  return (
  <ResponsiveContainer width="100%" height={300}>
      <AreaChart 
        data={data}
        style={{ backgroundColor: 'transparent' }}
      >
      <defs>
        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#875cf5" stopOpacity={0}/>
        </linearGradient>
      </defs>

        <CartesianGrid stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize:12, fill: isDark ? '#e5e7eb' : '#555'}} 
          stroke={isDark ? '#374151' : '#e5e7eb'}
        />
        <YAxis 
          tick={{ fontSize:12, fill: isDark ? '#e5e7eb' : '#555' }} 
          stroke={isDark ? '#374151' : '#e5e7eb'}
        />
      <Tooltip content={<CustomTooltip />} />

        <Area type="monotone" dataKey="amount" stroke="#875cf5" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r:3, fill: "#ab8df8" }}/>
       
    </AreaChart>
  </ResponsiveContainer>
  );
};

export default CustomLineChart;