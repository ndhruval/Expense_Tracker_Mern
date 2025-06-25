import React from 'react';
import { IoMdCard, IoMdAnalytics, IoMdCheckmarkCircle, IoMdTrendingUp, IoMdLock } from "react-icons/io";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">ET</span>
          </div>
          <h2 className="text-2xl font-bold gradient-text">Expense Tracker</h2>
        </div>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen glass relative overflow-hidden p-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Floating Cards */}
        <div className="relative z-10 space-y-6">
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <StatsInfoCard
              icon={<IoMdTrendingUp />}
              label="Smart Expense Tracking"
              value="430,000"
              subtitle="Total Savings"
              color="from-indigo-600 to-purple-600"
            />
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <StatsInfoCard
              icon={<IoMdAnalytics />}
              label="Visual Analytics"
              value="95%"
              subtitle="Accuracy Rate"
              color="from-emerald-500 to-teal-600"
            />
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <StatsInfoCard
              icon={<IoMdCheckmarkCircle />}
              label="Goal Achievement"
              value="12"
              subtitle="Monthly Goals"
              color="from-orange-500 to-red-500"
            />
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <StatsInfoCard
              icon={<IoMdLock />}
              label="Secure & Private"
              value="100%"
              subtitle="Data Protection"
              color="from-cyan-500 to-blue-600"
            />
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl backdrop-blur-sm border border-white/20"></div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl backdrop-blur-sm border border-white/20"></div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/25">
                <IoMdCard className="text-white text-2xl" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Smart Finance Management</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl backdrop-blur-sm border border-white/20"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-2xl backdrop-blur-sm border border-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({icon, label, value, subtitle, color}) => {
  return (
    <div className="card hover-lift">
      <div className="flex gap-4 items-center">
        <div className={`w-14 h-14 flex items-center justify-center text-2xl text-white bg-gradient-to-br ${color} rounded-xl shadow-lg shadow-black/10 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/20"></div>
          <div className="relative z-10">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h6 className="text-sm font-semibold text-gray-800 mb-1">{label}</h6>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-600">{value}</span>
            <span className="text-xs text-gray-500 font-medium">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
