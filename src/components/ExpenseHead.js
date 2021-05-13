import React from 'react';
import styled from 'styled-components';
import { useExpenseState } from '../ExpenseContext';

const ExpenseHeadBlock = styled.div`
  border-bottom: 2px solid #e9ecef;

  h1 {
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-bottom: 20px;
    color: #343a40;
    font-size: 21px;
    font-weight: bold;
  }
  .task-left {
    margin-bottom: 20px;
    color: #343a40;
    font-size: 21px;
    font-weight: bold;

    & span {
      color: #fa5252;
    }
  }
`;

function ExpenseHead() {
  const { data } = useExpenseState();
  const allAmount = data.reduce((prev, curr) => prev + curr.amount, 0);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ExpenseHeadBlock>
      <h1>오늘의 지출</h1>
      <div className="day">{dateString}</div>
      <div className="task-left">
        총 지출: <span>-{allAmount}원</span>
      </div>
    </ExpenseHeadBlock>
  );
}

export default ExpenseHead;
