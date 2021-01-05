import React from 'react';
import styled from 'styled-components';
import { useExpenseDispatch } from '../ExpenseContext';

const ExpenseCategoryBlock = styled.div`
  border-bottom: 2px solid #e9ecef;
  padding: 20px 0;
  color: #343a40;
  font-size: 21px;
  font-weight: bold;
  text-align: right;
`;

function ExpenseCategory() {
  const dispatch = useExpenseDispatch();

  const onFilter = e => {
    dispatch({
      type: 'FILTER',
      value: e.target.value,
    });
  };

  return (
    <>
      <ExpenseCategoryBlock>
        카테고리별로 보기: &nbsp;
        <select name="category" onChange={onFilter}>
          <option value="all">전체</option>
          <option value="meal">식사</option>
          <option value="food">식료품</option>
          <option value="traffic">교통</option>
          <option value="life">생활</option>
          <option value="medical">의료</option>
        </select>
      </ExpenseCategoryBlock>
    </>
  );
}

export default ExpenseCategory;
