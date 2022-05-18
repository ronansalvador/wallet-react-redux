// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

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

export const getcurrenciesThunk = () => {
  console.log('Redux Thunk');
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const allCurrencies = Object.keys(data);
      const currencies = allCurrencies.filter((moeda) => moeda !== 'USDT');
      dispatch(getCurrencies(currencies));
    } catch (error) {
      console.log(error);
    }
  };
};
