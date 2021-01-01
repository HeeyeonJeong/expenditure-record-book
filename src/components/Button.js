import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const StyledButton = styled.button`
  width: 60px;
  height: 35px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${props => {
    const color = props.theme.palatte[props.color];
    return css`
      background: ${color};
      &:hover {
        background: ${lighten(0.1, color)};
      }
      &:active {
        background: ${darken(0.1, color)};
      }
    `;
  }}

  & + & {
    margin-left: 10px;
  }
`;

function Button({ children, color, ...rest }) {
  return (
    <StyledButton color={color} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
