import styled, { css } from 'styled-components';
import { FaArrowDownUpAcrossLine, FaArrowUp19, FaArrowDown91 } from 'react-icons/fa6';

interface TableProps {
  $categoryCheck: boolean;
}

const sharedIconsStyle = css`
  height: 18px;
  width: 18px;
  margin-left: 9px;

  opacity: 0.8;
  cursor: pointer;
`;

export const TableWrapper = styled.div`
  height: 45vh;

  border-radius: 8px;
  border-top-left-radius: 0;
  border: 3px solid #5858e3;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  overflow-y: auto;
`;

export const TableStyled = styled.table`
  width: 100%;
`;

export const TableHeader = styled.th`
  position: sticky;
  top: 0;

  background: #fff;
  z-index: 10;

  cursor: default;
`;

export const TableHeaderText = styled.h2<TableProps>`
  display: flex;
  align-items: center;
  justify-content: ${p => (p.$categoryCheck ? 'start' : 'end')};

  font-weight: 700;
  font-size: 21px;
  text-transform: uppercase;

  color: #5858e3;
`;

export const TableRow = styled.tr`
  height: 30px;
  background-color: #f1f1f1;

  color: #3d3d3d;

  &:hover {
    color: #ffffff;
    background-color: #5858e3;
  }
`;

export const TableRowData = styled.td<TableProps>`
  font-weight: 600;
  font-size: 15px;
  text-align: ${p => (p.$categoryCheck ? 'start' : 'end')};
`;

export const DefaultSortIcon = styled(FaArrowDownUpAcrossLine)`
  ${sharedIconsStyle}
`;

export const AscendingIcon = styled(FaArrowUp19)`
  ${sharedIconsStyle}
`;

export const DescendingIcon = styled(FaArrowDown91)`
  ${sharedIconsStyle}
`;
