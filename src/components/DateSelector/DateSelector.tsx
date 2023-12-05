import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { RootState } from '../../redux/store';

import { setStartDate, setEndDate } from '../../redux/filter/filterSlice';

import { DatePickerWrapper } from './DateSelector.styled';

export const DateSelector = () => {
  const [dateRangeSelected, setDateRangeSelected] = useState(false);
  const dispatch = useDispatch();

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (dateRangeSelected && start) {
      dispatch(setStartDate(start.toISOString()));
      dispatch(setEndDate(''));
      setDateRangeSelected(false);
    } else {
      if (start) dispatch(setStartDate(start.toISOString()));
      if (end) {
        dispatch(setEndDate(new Date(end.setHours(23, 59, 59, 999)).toISOString()));
        setDateRangeSelected(true);
      }
    }
  };

  // memoizedDates to avoid rerendering
  const selectDates = createSelector(
    (state: RootState) => state.filter.startDate,
    (state: RootState) => state.filter.endDate,
    (startDate, endDate) => ({
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    })
  );

  const { startDate, endDate } = useSelector(selectDates);

  return (
    <DatePickerWrapper>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateRangeChange}
        minDate={new Date('2023-11-01')}
        maxDate={new Date('2023-11-30')}
        placeholderText="Click to select a date"
        dateFormat="yyyy/MM/dd"
        calendarStartDay={1}
      />
    </DatePickerWrapper>
  );
};
