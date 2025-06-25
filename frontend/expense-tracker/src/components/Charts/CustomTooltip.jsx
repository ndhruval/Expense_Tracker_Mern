import React from 'react'
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({active, payload}) => {
    const { isDark } = useTheme();
    
    if(active && payload && payload.length) {
        return (
            <div className={isDark ? "bg-gray-800 shadow-md rounded-lg p-2 border border-gray-600" : "bg-white shadow-md rounded-lg p-2 border border-gray-300"}>
                <p className={isDark ? "text-xs font-semibold text-purple-200 mb-1" : "text-xs font-semibold text-purple-800 mb-1"}>{payload[0].name}</p> 
                <p className={isDark ? "text-sm text-gray-200" : "text-sm text-gray-600"}>
                    Amount: <span className={isDark ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>${payload[0].value}</span>
                </p> 
            </div>
        )
    }
  return null;
}

export default CustomTooltip;