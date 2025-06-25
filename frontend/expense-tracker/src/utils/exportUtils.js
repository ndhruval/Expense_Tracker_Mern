import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import moment from 'moment';

// PDF Export Functions
export const exportToPDF = (data, type, title) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241); // Indigo color
  doc.text(title, 14, 22);
  
  // Add date
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // Gray color
  doc.text(`Generated on: ${moment().format('MMMM DD, YYYY')}`, 14, 32);
  
  // Prepare table data
  const tableData = data.map(item => [
    item.type === 'expense' ? item.category : item.source,
    `$${item.amount}`,
    moment(item.date).format('MMM DD, YYYY'),
    item.type === 'expense' ? 'Expense' : 'Income'
  ]);
  
  // Add table
  doc.autoTable({
    head: [['Description', 'Amount', 'Date', 'Type']],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [99, 102, 241],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });
  
  // Save PDF
  doc.save(`${type}_report_${moment().format('YYYY-MM-DD')}.pdf`);
};

// CSV Export Functions
export const exportToCSV = (data, type) => {
  const headers = ['Description', 'Amount', 'Date', 'Type'];
  const csvData = data.map(item => [
    item.type === 'expense' ? item.category : item.source,
    item.amount,
    moment(item.date).format('YYYY-MM-DD'),
    item.type === 'expense' ? 'Expense' : 'Income'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${type}_data_${moment().format('YYYY-MM-DD')}.csv`);
};

// Dashboard Summary Export
export const exportDashboardSummary = (dashboardData) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(99, 102, 241);
  doc.text('Financial Dashboard Report', 14, 22);
  
  // Date
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on: ${moment().format('MMMM DD, YYYY')}`, 14, 32);
  
  // Summary section
  doc.setFontSize(16);
  doc.setTextColor(99, 102, 241);
  doc.text('Financial Summary', 14, 50);
  
  const summaryData = [
    ['Total Balance', `$${dashboardData.totalBalance || 0}`],
    ['Total Income', `$${dashboardData.totalIncome || 0}`],
    ['Total Expenses', `$${dashboardData.totalExpense || 0}`],
  ];
  
  doc.autoTable({
    body: summaryData,
    startY: 60,
    styles: {
      fontSize: 12,
      cellPadding: 8,
    },
    headStyles: {
      fillColor: [99, 102, 241],
      textColor: 255,
      fontStyle: 'bold',
    },
  });
  
  // Recent transactions
  if (dashboardData.recentTransactions && dashboardData.recentTransactions.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text('Recent Transactions', 14, doc.lastAutoTable.finalY + 20);
    
    const transactionData = dashboardData.recentTransactions.map(item => [
      item.type === 'expense' ? item.category : item.source,
      `$${item.amount}`,
      moment(item.date).format('MMM DD, YYYY'),
      item.type === 'expense' ? 'Expense' : 'Income'
    ]);
    
    doc.autoTable({
      head: [['Description', 'Amount', 'Date', 'Type']],
      body: transactionData,
      startY: doc.lastAutoTable.finalY + 30,
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
    });
  }
  
  doc.save(`dashboard_report_${moment().format('YYYY-MM-DD')}.pdf`);
};

// Excel-like export (CSV with better formatting)
export const exportToExcel = (data, type) => {
  const headers = ['Description', 'Amount ($)', 'Date', 'Type', 'Notes'];
  const csvData = data.map(item => [
    `"${item.type === 'expense' ? item.category : item.source}"`,
    item.amount,
    moment(item.date).format('YYYY-MM-DD'),
    item.type === 'expense' ? 'Expense' : 'Income',
    '' // Placeholder for notes
  ]);
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${type}_detailed_report_${moment().format('YYYY-MM-DD')}.csv`);
}; 