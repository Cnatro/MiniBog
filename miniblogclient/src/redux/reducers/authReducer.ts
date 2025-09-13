import { ACTION_TYPE } from "../../contants";
import type { ActionTypeReducer, User } from "../../typeModule";

interface UserState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initState: UserState = {
  isLoading: false,
  user: null,
  error: null,
};

export default function authReducer(
  state = initState,
  actions: ActionTypeReducer
) {
  switch (actions.type) {
    case ACTION_TYPE.SET_SIGN_IN:
      return { ...state, isLoading: true };
    case ACTION_TYPE.SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, user: actions.payload };
    case ACTION_TYPE.SIGN_IN_FAIL:
      return { ...state, error: actions.payload };

    case ACTION_TYPE.SIGN_OUT:
      return initState;
      
    case ACTION_TYPE.SET_SIGN_UP:
      return { ...state, isLoading: true };
    case ACTION_TYPE.SIGN_UP_SECCESS:
      return { ...state, isLoading: false };
    case ACTION_TYPE.SIGN_UP_FAIL:
      return { ...state, error: actions.payload };
    default:
      return state;
  }
}
