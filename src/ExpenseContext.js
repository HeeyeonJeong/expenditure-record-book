import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialExpense = [
  {
    id: 1,
    title: '용개반점',
    category: 'meal',
    amount: 7000,
  },
  {
    id: 2,
    title: '양배추',
    category: 'food',
    amount: 5000,
  },
  {
    id: 3,
    title: '택시비',
    category: 'traffic',
    amount: 20000,
  },
  {
    id: 4,
    title: '관리비',
    category: 'life',
    amount: 100000,
  },
  {
    id: 5,
    title: '병원 진료',
    category: 'medical',
    sub: '의료',
    amount: 7000,
  },
];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.expense);
    case 'UPDATE':
      return state.map(expense =>
        expense.id === action.id
          ? {
              ...expense,
              expense: {
                id: action.id,
                title: action.title,
                category: action.category,
                amount: action.amount,
              },
            }
          : expense
      );
    case 'REMOVE':
      return state.filter(expense => expense.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ExpenseStateContext = createContext();
const ExpenseDispatchContext = createContext();
const ExpenseNextIdContext = createContext();

function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialExpense);
  const nextId = useRef(6);

  return (
    <ExpenseStateContext.Provider value={state}>
      <ExpenseDispatchContext.Provider value={dispatch}>
        <ExpenseNextIdContext.Provider value={nextId}>
          {children}
        </ExpenseNextIdContext.Provider>
      </ExpenseDispatchContext.Provider>
    </ExpenseStateContext.Provider>
  );
}

export default ExpenseProvider;

//hooks
export function useExpenseState() {
  const context = useContext(ExpenseStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useExpenseDispatch() {
  const context = useContext(ExpenseDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useExpenseNextId() {
  const context = useContext(ExpenseNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
