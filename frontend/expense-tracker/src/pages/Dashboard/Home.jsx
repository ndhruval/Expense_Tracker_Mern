import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { UserContext } from '../../context/UserContext';
import { exportDashboardSummary } from '../../utils/exportUtils';
import ExportButton from '../../components/ExportButton';
import { useTheme } from '../../context/ThemeContext';

import { LuHandCoins, LuWalletMinimal, LuUser, LuDownload } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const { isDark } = useTheme();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] =useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data) {
        setDashboardData(response.data);
      }

    } catch (error) {
      console.log("Something went wrong.Please try again.", error)
    }finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  const handleDashboardExport = () => {
    if (dashboardData) {
      exportDashboardSummary(dashboardData);
    }
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen p-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <LuUser className="text-2xl text-indigo-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold gradient-text mb-1">
                Welcome back, {user?.fullName?.split(' ')[0] || 'User'}!
              </h1>
              <p style={{ color: isDark ? '#d1d5db' : '#374151', fontSize: '1.125rem' }}>Here's what's happening with your finances today.</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0 )}
              color="from-indigo-600 to-purple-600"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0 )}
              color="from-emerald-500 to-teal-600"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0 )}
              color="from-red-500 to-pink-600"
          />
        </div>
      </div>

        {/* Main Content Grid */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
             totalBalance={dashboardData?.totalBalance || 0}
             totalIncome={dashboardData?.totalIncome || 0}
             totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
          />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;