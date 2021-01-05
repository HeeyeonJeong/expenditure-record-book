import React from 'react';
import styled from 'styled-components';
import { useExpenseState } from '../ExpenseContext';
import ExpenseItem from './ExpenseItem';

const ExpenseListBlock = styled.div`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
`;

function ExpenseList() {
  const { data, currentFilter, filterCategory } = useExpenseState();

  return (
    <ExpenseListBlock>
      {(currentFilter === 'all' ? data : filterCategory).map(item => (
        <ExpenseItem
          key={item.id}
          id={item.id}
          title={item.title}
          amount={item.amount}
          category={item.category}
        />
      ))}
    </ExpenseListBlock>
  );
}

export default ExpenseList;
