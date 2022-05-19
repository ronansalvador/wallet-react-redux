// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSE = 'GET_EXPENSE';
export const CURRENT_QUOTE = 'CURRENT_QUOTE';

export const addUserAction = (email) => ({
  type: ADD_USER,
  email,
});

// export function addProfessionalAction(state) {
//   return {
//     type: ADD_PROFESSIONAL,
//     payload: state,
//   };
// }

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

export const getcurrenciesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const allCurrencies = Object.keys(data);
    dispatch(currentQuote(data));
    const currencies = allCurrencies.filter((moeda) => moeda !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};
