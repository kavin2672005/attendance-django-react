import React from 'react';
import { exportExcel } from '../api/attendance';
import { useNavigate } from 'react-router-dom';

function ExportExcelPage() {
  const navigate = useNavigate();  // <-- add this line

  const handleExport = async () => {
    try {
      const response = await exportExcel();
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'attendance_report.xlsx';  // use .xlsx extension
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      alert('File downloaded');
      navigate('/dashboard');  // now navigate works
    } catch (error) {
      alert('Export failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Export Attendance</h2>
      <button onClick={handleExport}>Export Excel</button>
    </div>
  );
}

export default ExportExcelPage;
