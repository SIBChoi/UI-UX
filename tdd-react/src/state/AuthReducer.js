export const LOGINSUCCESS = 'LOGINSUCCESS';

const initState = {
  isLoggedIn: false,
  id: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGINSUCCESS:
      return { isLoggedIn: true, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
