import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import CustomTooltip from './CustomTooltip';
import { useTheme } from '../../context/ThemeContext';

const CustomBarChart = ({data}) => {
  const { isDark } = useTheme();

  const getBarColor = (index) => {
    return index %2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if(active && payload && payload.length) {
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
    <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={data}
              style={{ backgroundColor: 'transparent' }}
            >
                <CartesianGrid stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize:12, fill: isDark ? '#e5e7eb' : '#555'}} 
                  stroke={isDark ? '#374151' : '#e5e7eb'}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: isDark ? '#e5e7eb' : '#555'}} 
                  stroke={isDark ? '#374151' : '#e5e7eb'}
                />
                <Tooltip content={CustomTooltip} />
                <Bar
                dataKey="amount"
                fill="#FF8042"
                radius={[10,10,0,0]}
                activeDot={{ r: 8, fill: "yellow" }}
                activeStyle = {{ fill: "green" }}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart