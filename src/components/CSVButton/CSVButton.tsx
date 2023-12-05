import { ColumnDef } from '@tanstack/react-table';

import { ProductSale } from 'types/productSale';
import { DownloadCSVButton } from './CSVButton.styled';

type CSVButtonProps = {
  data: ProductSale[];
  columns: ColumnDef<ProductSale>[];
};

export const CSVButton = ({ data, columns }: CSVButtonProps) => {
  // table data processing for csv file
  const convertToCSV = () => {
    const headers = columns.map(col => col.header as string).join(',');
    const keys = columns.map(col => col.id);
    const rows = data.map(row => {
      return keys
        .map(key => {
          const value = row[key as keyof typeof row];
          return typeof value === 'undefined' ? '' : value;
        })
        .join(',');
    });

    return [headers, ...rows].join('\n');
  };

  const downloadCSV = () => {
    const csvString = convertToCSV();
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sales.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <DownloadCSVButton onClick={downloadCSV}>Download CSV</DownloadCSVButton>;
};
