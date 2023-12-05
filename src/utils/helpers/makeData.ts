import { faker } from '@faker-js/faker';

import { ProductSale } from 'types/productSale';

// transform date format into yyyy-mm-dd
const formatDateToString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
};

// generating fake data for each category and each date
const generateSaleRecord = (date: Date, category: string) => {
  return {
    id: faker.string.uuid(),
    productCategory: category,
    revenue: faker.number.int({ min: 50000, max: 150000 }),
    unitsSold: faker.number.int({ min: 10, max: 100 }),
    profitMargin: faker.number.int({ min: 10, max: 30 }),
    date: formatDateToString(date),
  };
};

export const generateSalesData = () => {
  const productCategories = ['Cables', 'Routers', 'Connectors'];
  const salesData: ProductSale[] = [];
  const startDate = new Date(2023, 10, 1);
  const endDate = new Date(2023, 11, 0);

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    productCategories.forEach(category => {
      salesData.push(generateSaleRecord(new Date(date), category));
    });
  }

  return salesData;
};
