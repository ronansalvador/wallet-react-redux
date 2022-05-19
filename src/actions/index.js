// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSE = 'GET_EXPENSE';
export const CURRENT_QUOTE = 'CURRENT_QUOTE';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const addUserAction = (email) => ({
  type: ADD_USER,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const getExpenses = (expense) => ({
  type: GET_EXPENSE,
  expense,
});

export const currentQuote = (currencies) => ({
  type: CURRENT_QUOTE,
  currencies,
});

export const removeExpenses = (id) => ({
  type: REMOVE_EXPENSES,
  id,
});

export const getcurrenciesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(currentQuote(data));
    const currencies = Object.keys(data).filter((moeda) => moeda !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};
