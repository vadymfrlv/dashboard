import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useReactTable,
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

import { ProductSale } from 'types/productSale';
import { useGetSalesDataQuery } from '../../redux/sales/salesApi';
import { selectFilter } from '../../redux/filter/filterSlice';
import { setTableTData, setTableDData } from '../../redux/tableData/tableData';

import {
  TableWrapper,
  TableStyled,
  TableHeader,
  TableHeaderText,
  TableRow,
  TableRowData,
  DefaultSortIcon,
  AscendingIcon,
  DescendingIcon,
} from './Table.styled';

export const Table = () => {
  const { data: salesData = [], isError } = useGetSalesDataQuery();
  const [sorting, setSorting] = useState<SortingState>([]);

  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  // filtering data by category or date range
  const filteredData = useMemo(() => {
    return salesData.filter(item => {
      return (
        (!filter.category || item.productCategory === filter.category) &&
        (!filter.startDate || new Date(item.date) >= new Date(filter.startDate)) &&
        (!filter.endDate || new Date(item.date) <= new Date(filter.endDate))
      );
    });
  }, [salesData, filter]);

  // columns structure for react-table
  const columns = useMemo<ColumnDef<ProductSale>[]>(
    () => [
      {
        id: 'productCategory',
        accessorKey: 'productCategory',
        header: 'Product category',
        cell: props => <p>{String(props.getValue())}</p>,
        enableSorting: false,
      },
      {
        id: 'revenue',
        accessorKey: 'revenue',
        header: 'Revenue',
        cell: props => <p>{String(props.getValue())}</p>,
      },
      {
        id: 'unitsSold',
        accessorKey: 'unitsSold',
        header: 'Units sold',
        cell: props => <p>{String(props.getValue())}</p>,
      },
      {
        id: 'profitMargin',
        accessorKey: 'profitMargin',
        header: 'Profit margin',
        cell: props => <p>{String(props.getValue())}</p>,
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: props => <p>{String(props.getValue())}</p>,
        enableSorting: false,
      },
    ],
    []
  );

  // react-table init
  const table = useReactTable({
    data: filteredData,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // receive sorted table data to dispatch and recieve in the csv file
  const sortedData = table.getRowModel().rows.map(row => row.original);

  const columnDataForRedux = columns.map(({ id, header }) => ({
    id,
    header: header?.toString(),
  }));

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      dispatch(setTableTData(sortedData));
    }
    if (columns && columns.length > 0) {
      dispatch(setTableDData(columnDataForRedux));
    }
  }, [dispatch, sortedData, columns, salesData, columnDataForRedux]);

  if (isError) {
    return;
  }

  return (
    <TableWrapper>
      <TableStyled>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <TableHeaderText
                      $categoryCheck={header.column.id === 'productCategory'}
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort()
                        ? {
                            asc: <AscendingIcon />,
                            desc: <DescendingIcon />,
                          }[header.column.getIsSorted() as string] ?? <DefaultSortIcon />
                        : null}
                    </TableHeaderText>
                  )}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableRowData key={cell.id} $categoryCheck={cell.column.id === 'productCategory'}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableRowData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </TableStyled>
    </TableWrapper>
  );
};
