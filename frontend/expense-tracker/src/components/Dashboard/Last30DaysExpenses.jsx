import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { IoMdAnalytics } from 'react-icons/io';

const Last30DaysExpenses = ({data}) => {

    const [chartDat, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        
        return () => {};
    }, [data]);
  return (
    <div className="card col-span-1 hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h5 className="text-xl font-bold gradient-text mb-1">30 Days Expenses</h5>
                <p className="text-sm text-gray-600">Monthly spending analysis</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                <IoMdAnalytics className="text-xl text-orange-600" />
            </div>
        </div>

        <div className="chart-container">
            <CustomBarChart data= {chartDat}/>
        </div>
    </div>
  )
}

export default Last30DaysExpenses