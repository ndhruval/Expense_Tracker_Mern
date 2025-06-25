import React, { useEffect, useState } from 'react';
import { LuPlus, LuWalletMinimal } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';


const IncomeOverview = ({ transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => {};
    }, [ transactions]);
  return ( 
    <div className="card hover-lift animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-xl font-bold gradient-text mb-1">Income Overview</h5>
          <p className="text-sm text-gray-600">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
          <LuWalletMinimal className="text-xl text-emerald-600" />
        </div>
      </div>

      <div className="chart-container">
        <CustomBarChart data={chartData} />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="add-btn w-full justify-center" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
    </div>
  )
}

export default IncomeOverview