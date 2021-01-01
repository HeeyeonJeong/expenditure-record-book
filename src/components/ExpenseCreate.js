import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import Dialog from './Dialog';
import UseInput from '../UseInput';
import { useExpenseDispatch, useExpenseNextId } from '../ExpenseContext';

const CircleButton = styled.div`
  background-color: #1c7ed6;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-size: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

function ExpenseCreate() {
  const [{ title, amount, category }, onChange, reset] = UseInput({
    title: '',
    amount: '',
    category: '',
  });

  const dispatch = useExpenseDispatch();
  const nextId = useExpenseNextId();

  const onCreate = () => {
    dispatch({
      type: 'CREATE',
      expense: {
        id: nextId.current,
        title,
        category,
        amount: parseInt(amount),
      },
    });
    reset();
    onCancle();
    nextId.current += 1;
  };

  const [createDialog, setCreateDialog] = useState(false);
  const onClick = () => {
    setCreateDialog(true);
  };
  const onCancle = () => {
    setCreateDialog(false);
  };

  return (
    <>
      <CircleButton onClick={onClick}>
        <MdAdd />
      </CircleButton>
      <Dialog
        title={title}
        amount={amount}
        category={category}
        onChange={onChange}
        visible={createDialog}
        text="지출 등록"
        confirmText="등록"
        cancleText="취소"
        onConfirm={onCreate}
        onCancle={onCancle}
      />
    </>
  );
}

export default ExpenseCreate;
