import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  position: relative;
  width: 135px;
  margin-right: 10px;
`;

export const Selector = styled.div`
  height: 100%;
  width: 100%;
  padding: 2px 0 3px 5px;

  font-size: 15px;

  color: #3d3d3d;
  border-radius: 7px;
  border: 3px solid #5858e3;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  cursor: pointer;
  outline: none;
  appearance: none;

  &:hover {
    color: #ffffff;
    background-color: #5858e3;
  }
`;

export const SelectList = styled.ul`
  position: absolute;
  top: 39px;
  left: 0;
  width: 135px;

  font-size: 15px;

  color: #3d3d3d;
  border: 3px solid #5858e3;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  overflow-y: auto;
`;

export const SelectItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 10px;

  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #5858e3;
  }
`;
