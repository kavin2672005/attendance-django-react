import React, { useEffect, useState } from 'react';
import { getMonthlyReport } from '../api/attendance';

function MonthlyReportPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMonthlyReport()
      .then(res => {
        console.log('Monthly report response:', res.data);
        setReport(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching monthly report:', err.response || err.message || err);
        setError('Failed to load report.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading monthly report...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!report) return <p>No report data available.</p>;

  return (
    <div>
      <h2>Monthly Report</h2>
      <p><strong>Total Present Days:</strong> {report.total_days}</p>

      {report.records && report.records.length > 0 ? (
        report.records.map((record, index) => (
          <div key={index}>
            <p><strong>Date:</strong> {record.date}</p>
            <p><strong>Punch In:</strong> {record.punch_in || 'N/A'}</p>
            <p><strong>Punch Out:</strong> {record.punch_out || 'N/A'}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No attendance records found for this month.</p>
      )}
    </div>
  );
}

export default MonthlyReportPage;
