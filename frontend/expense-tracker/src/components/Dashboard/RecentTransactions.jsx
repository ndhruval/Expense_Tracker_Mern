import React from 'react'
import moment from 'moment'
import { LuArrowRight, LuHistory } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h5 className="text-xl font-bold gradient-text mb-1">Recent Transactions</h5>
                <p className="text-sm text-gray-500 dark:text-gray-300">Your latest financial activities</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <LuHistory className="text-xl text-indigo-600" />
            </div>
        </div>

        <div className="space-y-4">
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                key={item._id}
                title={item.type == 'expense' ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />
            ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="card-btn w-full justify-center" onClick={onSeeMore}>
                See All Transactions <LuArrowRight className="text-base" />
            </button>
        </div>
    </div>
  );
};

export default RecentTransactions;