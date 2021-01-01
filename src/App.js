import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ExpenseCategory from './components/ExpenseCategory';
import ExpenseCreate from './components/ExpenseCreate';
import ExpenseHead from './components/ExpenseHead';
import ExpenseList from './components/ExpenseList';
import ExpenseTemplate from './components/ExpenseTemplate';
import ExpenseProvider from './ExpenseContext';

const GlobalStyle = createGlobalStyle`
  body{
    background-color:#e9ecef;
  }
`;

function App() {
  return (
    <ExpenseProvider>
      <GlobalStyle />
      <ExpenseTemplate>
        <ExpenseHead />
        <ExpenseCategory />
        <ExpenseList />
        <ExpenseCreate />
      </ExpenseTemplate>
    </ExpenseProvider>
  );
}

export default App;
