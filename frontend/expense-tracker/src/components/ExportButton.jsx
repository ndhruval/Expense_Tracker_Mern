import React, { useState, useRef, useEffect } from 'react';
import { LuDownload, LuFileText, LuFileSpreadsheet, LuFile } from 'react-icons/lu';
import { exportToPDF, exportToCSV, exportToExcel } from '../utils/exportUtils';

const ExportButton = ({ data, type, title, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExport = (exportType) => {
    try {
      if (!data || data.length === 0) {
        alert('No data available to export.');
        return;
      }
      switch (exportType) {
        case 'pdf':
          exportToPDF(data, type, title);
          break;
        case 'csv':
          exportToCSV(data, type);
          break;
        case 'excel':
          exportToExcel(data, type);
          break;
        default:
          break;
      }
      setIsOpen(false);
    } catch (error) {
      alert('Export failed. Please check your browser console for details.');
      console.error('Export failed:', error);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="card-btn flex items-center gap-2"
        disabled={!data || data.length === 0}
      >
        <LuDownload className="text-base" />
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <LuFileText className="text-lg text-red-500" />
              Export as PDF
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <LuFileSpreadsheet className="text-lg text-green-500" />
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <LuFile className="text-lg text-blue-500" />
              Export as Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton; 