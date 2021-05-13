import React, { createContext, useContext, useReducer, useRef } from 'react';
import produce from 'immer';

const initialExpense = {
  data: [
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
      amount: 7000,
    },
  ],
  currentFilter: 'all',
  filterCategory: [],
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        data: state.data.concat(action.data),
      };
    case 'UPDATE':
      return {
        ...state,
        data: state.data.map(expense =>
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
        ),
      };
    case 'REMOVE':
      return {
        ...state,
        data: state.data.filter(expense => expense.id !== action.id),
      };
    case 'FILTER':
      return produce(state, draft => {
        draft.currentFilter = action.value;
        draft.filterCategory = draft.data.filter(
          expense => expense.category === action.value
        );
      });
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
    throw new Error('Cannot find ExpenseProvider');
  }
  return context;
}

export function useExpenseDispatch() {
  const context = useContext(ExpenseDispatchContext);
  if (!context) {
    throw new Error('Cannot find ExpenseProvider');
  }
  return context;
}

export function useExpenseNextId() {
  const context = useContext(ExpenseNextIdContext);
  if (!context) {
    throw new Error('Cannot find ExpenseProvider');
  }
  return context;
}
