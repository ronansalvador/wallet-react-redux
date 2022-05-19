// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, GET_EXPENSE, CURRENT_QUOTE } from '../actions';

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
  default:
    return state;
  }
}

export default wallet;
