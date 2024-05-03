import React from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const ExportButtons = ({ tableRef }) => {
  return (
    <DownloadTableExcel
      filename="users_table"
      sheet="users"
      currentTableRef={() => tableRef.current}
    >
      <button>Export Excel</button>
    </DownloadTableExcel>
  );
};

export default ExportButtons;
