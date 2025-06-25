import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { IoMdAnalytics } from 'react-icons/io';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h5 className="text-xl font-bold gradient-text mb-1">Income Overview</h5>
                <p className="text-sm text-gray-600">60 days income breakdown</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                <IoMdAnalytics className="text-xl text-cyan-600" />
            </div>
        </div>

        <div className="chart-container">
            <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
            />
        </div>
    </div>
  )
}

export default RecentIncomeWithChart;