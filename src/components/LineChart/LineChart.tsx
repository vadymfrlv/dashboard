import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { selectTableData } from '../../redux/tableData/tableData';
import { selectComparison } from '../../redux/compare/compareSlice';

import { LineChartWrapper } from './LineChart.styled';

interface TableRow {
  date: string;
  productCategory: string;
  unitsSold: number;
}

interface ChartDataAccumulator {
  [date: string]: {
    [category: string]: number;
  };
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = () => {
  const { tableData } = useSelector(selectTableData);
  const { selectedCategories } = useSelector(selectComparison);

  // data processing for the chart
  const getDataForChart = (tableData: TableRow[], selectedCategories: string[]) => {
    return tableData.reduce<ChartDataAccumulator>((acc, row) => {
      const date = row['date'];
      if (!acc[date]) {
        acc[date] = { cables: 0, routers: 0, connectors: 0 };
      }
      // checking if comparison mode was selected
      if (selectedCategories.length !== 2 || selectedCategories.includes(row['productCategory'])) {
        acc[date][row['productCategory'].toLowerCase()] += row['unitsSold'];
      }
      return acc;
    }, {});
  };

  const dataForChart = getDataForChart(tableData, selectedCategories);
  const labels = Object.keys(dataForChart);

  // chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Units sold',
        padding: {
          top: 0,
          bottom: 0,
        },
        color: '#3d3d3d',
      },
    },
  };

  // chart's data to be displayed
  const datasets =
    selectedCategories.length === 2
      ? selectedCategories.map(category => ({
          label: category,
          data: labels.map(label => dataForChart[label][category.toLowerCase()]),
          borderColor:
            category === 'Cables' ? '#0000ff' : category === 'Routers' ? '#ff5900' : '#4eeea1',
          backgroundColor:
            category === 'Cables'
              ? '#0000ff5c'
              : category === 'Routers'
              ? '#ff590083'
              : '#4eeea18e',
        }))
      : [
          {
            label: 'Cables',
            data: labels.map(label => dataForChart[label].cables),
            borderColor: '#0000ff',
            backgroundColor: '#0000ff5c',
          },
          {
            label: 'Routers',
            data: labels.map(label => dataForChart[label].routers),
            borderColor: '#ff5900',
            backgroundColor: '#ff590083',
          },
          {
            label: 'Connectors',
            data: labels.map(label => dataForChart[label].connectors),
            borderColor: '#4eeea1',
            backgroundColor: '#4eeea18e',
          },
        ];

  const data = {
    labels,
    datasets,
  };

  return (
    <LineChartWrapper>
      <Line options={options} data={data} />
    </LineChartWrapper>
  );
};
