import { LOGIN_MODAL } from '../actions/index';

const loginModalReducer = (state = { isModal: false }, action) => {
  switch (action.type) {
    case LOGIN_MODAL:
      return { isModal: action.payload.isModal };

    default:
      return state;
  }
};

export default loginModalReducer;