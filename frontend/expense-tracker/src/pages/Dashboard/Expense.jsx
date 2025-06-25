import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';

import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
   useUserAuth();

   const [expenseData, setExpenseData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [openDeleteAlert, setOpenDeleteAlert] = useState({
       show: false,
       data:null,
     });
   
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wromg. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category , amount, date, icon } = expense;

    if(!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be a valid number grater than 0.");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense= async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data:null });
      toast.success("Income details deleted successfully");
      fetchExpenseDetails();
    } catch (error){
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:",error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails()

    return () => {

    }
  }, []);
  return (
     <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="">
          <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=> {
          setOpenDeleteAlert({ show:true, data: id });
        }}
        onDownload={handleDownloadExpenseDetails}
        />
      </div>

      <Modal 
      isOpen={openAddExpenseModal}
      onClose={() => setOpenAddExpenseModal(false)}
      title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense}/>
      </Modal>

      <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
     </DashboardLayout>
  );
};


export default Expense;