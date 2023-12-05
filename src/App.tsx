import { Box } from 'components/Box/Box';
import { Table } from 'components/Table/Table';
import { TableFunctionalPanel } from 'components/TableFunctionalPanel/TableFunctionalPanel';
import { LineChart } from 'components/LineChart/LineChart';
import { DoughnutChart } from 'components/DoughnutChart/DoughnutChart';

function App() {
  return (
    <Box>
      <Box display="flex">
        <Box width="48%" marginRight="10px">
          <Table />
          <TableFunctionalPanel />
        </Box>
        <DoughnutChart />
      </Box>
      <LineChart />
    </Box>
  );
}

export default App;
