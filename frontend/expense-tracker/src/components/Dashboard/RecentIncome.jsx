import React from 'react'
import { LuArrowRight, LuWalletMinimal } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h5 className="text-xl font-bold gradient-text mb-1">Recent Income</h5>
                <p className="text-sm text-gray-500 dark:text-gray-300">Monitor your earnings</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                <LuWalletMinimal className="text-xl text-emerald-600" />
            </div>
        </div>

        <div className="space-y-4">
            {transactions?.slice(0,5)?.map((item) =>(
                <TransactionInfoCard
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn
            />
                
            ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="card-btn w-full justify-center" onClick={onSeeMore}>
                See All Income <LuArrowRight className="text-base"/>
            </button>
        </div>
    </div>
  )
}

export default RecentIncome;