import React from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import Button from './Button';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 40px;
  background: white;
  border-radius: 2px;

  h3 {
    margin-bottom: 20px;
    font-size: 25px;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`;

const FormBlock = styled.form`
  div {
    margin-bottom: 20px;
    label {
      display: block;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      height: 30px;
    }

    select {
      width: 100%;
      height: 30px;
    }
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const palatte = {
  gray: '#495057',
  blue: '#228be6',
  red: '#fa5252',
};

function Dialog({
  title,
  amount,
  category,
  onChange,
  text,
  confirmText,
  cancleText,
  visible,
  onConfirm,
  onCancle,
}) {
  if (!visible) return null;

  return (
    <DarkBackground>
      <DialogBlock>
        <h3>{text}</h3>

        {onConfirm.name !== 'onRemove' ? (
          <FormBlock>
            <div>
              <label htmlFor="title">내용</label>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="amount">금액</label>
              <input
                id="amount"
                type="number"
                name="amount"
                value={amount}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="category-select">카테고리</label>
              <select
                id="category-select"
                name="category"
                value={category}
                onChange={onChange}
              >
                <option defaultValue>전체</option>
                <option value="meal">식사</option>
                <option value="food">식료품</option>
                <option value="traffic">교통</option>
                <option value="life">생활</option>
                <option value="medical">의료</option>
              </select>
            </div>
          </FormBlock>
        ) : null}

        <ThemeProvider theme={{ palatte }}>
          <ButtonGroup>
            <Button color="gray" onClick={onCancle}>
              {cancleText}
            </Button>
            <Button
              color={onConfirm.name === 'onRemove' ? 'red' : 'blue'}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </DialogBlock>
    </DarkBackground>
  );
}

export default Dialog;
