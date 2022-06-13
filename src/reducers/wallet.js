// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_EXPENSE,
  CURRENT_QUOTE,
  REMOVE_EXPENSES,
  EDIT_EXPENSES,
  EDIT_EXPENSES_FORM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expense,
        exchangeRates: { ...state.exchangeRates },
      }],

    };
  case CURRENT_QUOTE:
    return {
      ...state,
      exchangeRates: action.currencies,
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      buttonEdit: true,
      editExpense: action.expense,
    };

  case EDIT_EXPENSES_FORM:
    return {
      ...state,
      buttonEdit: false,
      expenses: [...action.expenses],
      editExpense: {},
    };
  default:
    return state;
  }
}

export default wallet;
