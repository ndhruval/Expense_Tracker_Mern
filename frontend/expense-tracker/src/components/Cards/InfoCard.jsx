import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex gap-6 items-center">
            <div className={`w-16 h-16 flex items-center justify-center text-[28px] text-white bg-gradient-to-br ${color} rounded-2xl shadow-lg shadow-black/10 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20"></div>
                <div className="relative z-10">
                    {icon}
                </div>
            </div>
            <div className="flex-1">
                <h6 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">{label}</h6>
                <span className="text-2xl font-bold gradient-text">${value}</span>
            </div>
        </div>
    </div>
  );
};

export default InfoCard