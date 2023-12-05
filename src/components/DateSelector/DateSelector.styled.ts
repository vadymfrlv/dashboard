import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  margin-right: 10px;

  .react-datepicker-wrapper input {
    height: 29px;
    width: 175px;
    padding: 2px 0 3px 5px;

    font-size: 14px;
    color: #3d3d3d;
    border-radius: 7px;
    border: 3px solid #5858e3;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    cursor: pointer;
    outline: none;
    appearance: none;

    &::placeholder {
      color: #3d3d3d;
    }

    &:hover::placeholder {
      color: #ffffff;
    }

    &:hover {
      color: #ffffff;
      background-color: #5858e3;
    }
  }

  .react-datepicker {
    border-radius: 7px;
    border: 3px solid #5858e3;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    background-color: #ffffff;
    border-bottom: none;
  }

  .react-datepicker__current-month {
    color: #3d3d3d;
  }

  .react-datepicker__day-name {
    text-align: center;
    font-weight: 500;
    color: #3d3d3d;
  }

  .react-datepicker__day {
    font-weight: 500;
    color: #3d3d3d;
  }

  .react-datepicker__day.react-datepicker__day--disabled {
    color: #3d3d3d4c;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    color: #ffffff;
    background-color: #5858e3c9;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover {
    color: #3d3d3d;
    background-color: #5858e3;
  }

  .react-datepicker__day:hover {
    background-color: #5858e334;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 17px;
    height: 17px;
    line-height: 17px;
  }

  .react-datepicker__close-icon::after {
    z-index: 1000;
  }
`;
