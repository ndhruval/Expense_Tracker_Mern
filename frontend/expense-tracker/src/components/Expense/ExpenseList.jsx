import moment from 'moment'
import React from 'react'
import { LuDownload, LuList } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import ExportButton from '../ExportButton'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
              <h5 className="text-xl font-bold gradient-text mb-1">All Expenses</h5>
              <p className="text-sm text-gray-600">
                View and manage all your expense transactions and categories.
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
              <LuList className="text-xl text-orange-600" />
            </div>
        </div>

        <div className="mb-4 flex justify-end">
            <ExportButton 
              data={transactions} 
              type="expense" 
              title="Expense Report"
              className="mr-2"
            />
            <button className="card-btn" onClick={onDownload}>
                <LuDownload className="text-base"/> Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions?.map((expense) => (
                <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    icon={expense.icon}
                    date={moment(expense.date).format("DD MMM YYYY")}
                    amount={expense.amount}
                    type="expense"
                    onDelete={() => onDelete(expense._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList