import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ProductSale } from 'types/productSale';
import { generateSalesData } from 'utils/helpers/makeData';

export const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getSalesData: builder.query<ProductSale[], void>({
      queryFn: () => {
        // simulating an async request
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ data: generateSalesData() });
          }, 300);
        });
      },
    }),
  }),
});

export const { useGetSalesDataQuery } = salesApi;
