import { useSelector } from 'react-redux';

import { CategorySelector } from 'components/CategorySelector/CategorySelector';
import { DateSelector } from 'components/DateSelector/DateSelector';
import { CompareSelector } from 'components/CompareSelector/CompareSelector';
import { selectTableData } from '../../redux/tableData/tableData';
import { CSVButton } from 'components/CSVButton/CSVButton';

import { TableFunctionalPanelWrapper } from './TableFunctionalPanel.styled';

export const TableFunctionalPanel = () => {
  const { tableData, columnsData } = useSelector(selectTableData);

  return (
    <TableFunctionalPanelWrapper>
      <CategorySelector />
      <DateSelector />
      <CompareSelector />
      <CSVButton data={tableData} columns={columnsData} />
    </TableFunctionalPanelWrapper>
  );
};
