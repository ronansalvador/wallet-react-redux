// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
// export const ADD_PROFESSIONAL = 'ADD_PROFESSIONAL';

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
