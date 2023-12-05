import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { selectTableData } from '../../redux/tableData/tableData';
import { selectComparison } from '../../redux/compare/compareSlice';

import { DoughnutChartWrapper } from './DoughnutChart.styled';

interface CategoryAccumulator {
  [category: string]: number;
}

interface CategoryColors {
  [key: string]: {
    backgroundColor: string;
    borderColor: string;
  };
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const { tableData } = useSelector(selectTableData);
  const { selectedCategories } = useSelector(selectComparison);

  // checking if comparison mode was selected
  const filteredData =
    selectedCategories.length === 2
      ? tableData.filter(row => selectedCategories.includes(row['productCategory']))
      : tableData;

  // data processing for the chart
  const getDataForChart = filteredData.reduce<CategoryAccumulator>((acc, row) => {
    const category = row['productCategory'];
    const value = row['unitsSold'];

    if (selectedCategories.length !== 2 || selectedCategories.includes(category)) {
      acc[category] = (acc[category] || 0) + value;
    }

    return acc;
  }, {});

  const labels = Object.keys(getDataForChart);
  const dataValues = labels.map(label => getDataForChart[label]);

  // map of colors for each category
  const categoryColors: CategoryColors = {
    Cables: {
      borderColor: '#0000ff',
      backgroundColor: '#0000ff5c',
    },
    Routers: {
      borderColor: '#ff5900',
      backgroundColor: '#ff590083',
    },
    Connectors: {
      borderColor: '#4eeea1',
      backgroundColor: '#4eeea18e',
    },
  };

  // selecting colors for each category
  const backgroundColors = labels.map(label => categoryColors[label].backgroundColor);
  const borderColors = labels.map(label => categoryColors[label].borderColor);

  // chart's data to be displayed
  const data = {
    labels,
    datasets: [
      {
        label: '# of Units sold',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 3,
      },
    ],
  };

  return (
    <DoughnutChartWrapper>
      <Doughnut data={data} />
    </DoughnutChartWrapper>
  );
};
