# expenditure-record-book

React로 구현한 지출기록지. ContextAPI를 활용하여 지출 등록, 지출 삭제, 지출 수정하여 상태를 관리하고 카테고리별 정렬이 가능합니다.

<br/>

![image](https://user-images.githubusercontent.com/70693728/111025560-440a0e00-8428-11eb-8abf-998e4cf32ffe.png)

- [Problem & Solution 정리](https://heeyeonjeong.tistory.com/78?category=945817)

<br/>

## ⚙ Stack

React

- styled-components
- react-icons
- polished
- immer

상태관리

- context API

<br/>

## 📚 Features

### Components

- [x] ExpenseTemplate - 레이아웃
- [x] ExpenseHead - 오늘 날짜, 총 지출 금액
- [x] ExpenseCategory - 카테고리 별 지출 분류
- [x] ExpenseList - 카테고리 별 or 초기 데이터 전달
- [x] ExpenseItem
  - 지출 수정 : 수정 버튼 클릭시 수정을 위한 Dialog open (미완성)
  - 지출 삭제 : 휴지통 클릭시 삭제를 위한 Dialog open
- [x] ExpenseCreate - 새로운 지출 등록
  - 버튼 클릭시 새 지출 등록을 위한 form Dialog open
- [x] Dialog
- [x] Button

<br/>

### `useReducer`와 `Context API`를 사용하여 상태관리

```javascript
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
```

<br/>

### custom Hooks

- context API를 쉽게 사용할 수 있는 custom Hook
  - useExpenseState
  - useExpenseDispatch
  - useExpenseNextId

```javascript
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
```

<br/>

- `useInput` custom Hook

```javascript
import { useState } from 'react';

//useInput hook
function UseInput(initialInput) {
  const [inputs, setInputs] = useState(initialInput);

  const reset = () => {
    setInputs(initialInput);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return [inputs, onChange, reset];
}

export default UseInput;
```
