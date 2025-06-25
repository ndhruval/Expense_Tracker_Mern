import React, { useEffect, useState } from 'react';
import { LuPlus, LuReceipt } from "react-icons/lu";
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions,onExpenseIncome}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  
  return (
    <div className="card hover-lift animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h5 className="text-xl font-bold gradient-text mb-1">Expense Overview</h5>
          <p className="text-sm text-gray-600">
          Track your spending trends over time and gain insights where your money goes.
        </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
          <LuReceipt className="text-xl text-red-600" />
        </div>
      </div>

      <div className="chart-container">
        <CustomLineChart data={chartData} />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="add-btn w-full justify-center" onClick={onExpenseIncome}>
        <LuPlus className="text-lg" />
        Add Expense
      </button>
    </div>
    </div>
  );
};

export default ExpenseOverview;