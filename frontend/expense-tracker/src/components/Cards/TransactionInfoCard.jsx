import React from 'react';
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";
import { useTheme } from '../../context/ThemeContext';

const TransactionInfoCard = ( { 
    title, icon, date, amount, type, hideDeleteBtn, onDelete
}) => {
    const { isDark } = useTheme();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);

    const getAmountStyles = ()=>
        type === "income" ? "bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400" : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400";
    
    // Determine background color for focus/active
    let overrideBg = '';
    if (isFocused || isActive) {
        overrideBg = isDark ? '#4b5563' : '#f3f4f6';
    }

  return (
    <div
      tabIndex={0}
      style={overrideBg ? `background: ${overrideBg} !important;` : undefined}
      className="txn-card group relative flex items-center gap-4 mt-2 p-3 rounded-lg
        hover:bg-gray-100/60 focus:bg-gray-100/80 focus:!bg-gray-100/80 active:bg-gray-200 active:!bg-gray-200
        dark:hover:bg-gray-700/60 dark:focus:bg-gray-700/70 dark:focus:!bg-gray-700/70 dark:active:bg-gray-800 dark:active:!bg-gray-800
        transition-all duration-200 focus:outline-none"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
    >
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 dark:text-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full border border-gray-200 dark:border-gray-600">
            {icon ? (
                <img src={icon} alt={title} className="w-6 h-6" />
            ) : (
                <LuUtensils />
            )}
        </div>

        <div className="flex-1 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-200 font-medium">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{date}</p>
            </div>

            <div className="flex items-center gap-2">
                {!hideDeleteBtn && (
                    <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={onDelete}>
                        <LuTrash2 size={18} />
                    </button>
                )}

                <div 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"} ${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
            </div>
        </div>
    </div>

  )
}

export default TransactionInfoCard