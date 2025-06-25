import React from 'react'
import moment from 'moment';
import { LuArrowRight, LuHandCoins } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h5 className="text-xl font-bold gradient-text mb-1">Recent Expenses</h5>
                <p className="text-sm text-gray-500 dark:text-gray-300">Track your spending patterns</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                <LuHandCoins className="text-xl text-red-600" />
            </div>
        </div>

        <div className="space-y-4">
            {transactions?.slice(0,5)?.map((expense) => (
                <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("DD MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="card-btn w-full justify-center" onClick={onSeeMore}>
                See All Expenses <LuArrowRight className="text-base" />
            </button>
        </div>
    </div>
  );
};

export default ExpenseTransactions;