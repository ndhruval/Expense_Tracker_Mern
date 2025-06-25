import React from 'react'
import { LuDownload, LuList } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import ExportButton from '../ExportButton'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card hover-lift animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
            <div>
              <h5 className="text-xl font-bold gradient-text mb-1">Income Sources</h5>
              <p className="text-sm text-gray-600">
                View and manage all your income transactions and sources.
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
              <LuList className="text-xl text-blue-600" />
            </div>
        </div>

        <div className="mb-4 flex justify-end">
            <ExportButton 
              data={transactions} 
              type="income" 
              title="Income Report"
              className="mr-2"
            />
            <button className="card-btn" onClick={onDownload}>
                <LuDownload className="text-base" /> Download   
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions?.map((income) =>(
                <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.data).format("DD MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income._id)}
                />
            ))}
        </div>

    </div>
  )
}

export default IncomeList