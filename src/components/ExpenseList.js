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
  const expenses = useExpenseState();
  return (
    <ExpenseListBlock>
      {expenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          category={expense.category}
        />
      ))}
    </ExpenseListBlock>
  );
}

export default ExpenseList;
