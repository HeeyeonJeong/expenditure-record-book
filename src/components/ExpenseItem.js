import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdEdit, MdDelete } from 'react-icons/md';
import Dialog from './Dialog';
import { useExpenseDispatch } from '../ExpenseContext';
import UseInput from '../UseInput';

const ExpenseItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
  }
`;

const CategoryBlock = styled.div`
  padding: 10px;
  border-radius: 5px;
  color: #495057;
  font-weight: bold;
  margin-right: 15px;
  ${props => {
    switch (props.category) {
      case 'meal':
        return css`
          background-color: #ffec99;
        `;
      case 'food':
        return css`
          background-color: #d8f5a2;
        `;
      case 'traffic':
        return css`
          background-color: #ffd8a8;
        `;
      case 'life':
        return css`
          background-color: #fcc2d7;
        `;
      case 'medical':
        return css`
          background-color: #bac8ff;
        `;
      default:
        console.log('No selected category');
      // throw new Error(`No selected category`);
    }
  }}
`;

const Title = styled.div`
  color: #495057;
  font-weight: bold;
`;

const Amount = styled.div`
  font-size: 21px;
  color: #fa5252;
  font-weight: bold;
  margin-right: 15px;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

function ExpenseItem({ id, title, category, amount }) {
  const options = [
    { label: '식사', value: 'meal' },
    { label: '식료품', value: 'food' },
    { label: '교통', value: 'traffic' },
    { label: '생활', value: 'life' },
    { label: '의료', value: 'medical' },
  ];

  const [inputs, onChange, reset] = UseInput();
  const dispatch = useExpenseDispatch();

  const onUpdate = () => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        title,
        category,
        amount,
      },
    });
    onCancle();
  };

  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  };

  const [updateDialog, setUpdateDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);

  const onUpdateClick = () => {
    setUpdateDialog(true);
  };

  const onRemoveClick = () => {
    setRemoveDialog(true);
  };

  const onCancle = () => {
    setUpdateDialog(false);
    setRemoveDialog(false);
  };

  return (
    <ExpenseItemBlock>
      <div className="left">
        <CategoryBlock category={category}>
          {options.find(option => option.value === category).label}
        </CategoryBlock>
        <Title>{title}</Title>
      </div>
      <div className="right">
        <Amount>-{amount}원</Amount>
        <Edit onClick={onUpdateClick}>
          <MdEdit />
        </Edit>
        <Dialog
          title={title}
          amount={amount}
          category={category}
          onChange={onChange}
          visible={updateDialog}
          text="지출 수정"
          confirmText="수정"
          cancleText="취소"
          onConfirm={onUpdate}
          onCancle={onCancle}
        />

        <Remove onClick={onRemoveClick}>
          <MdDelete />
        </Remove>
        <Dialog
          visible={removeDialog}
          text="정말 삭제하시겠습니까?"
          confirmText="삭제"
          cancleText="취소"
          onConfirm={onRemove}
          onCancle={onCancle}
        />
      </div>
    </ExpenseItemBlock>
  );
}

export default ExpenseItem;
