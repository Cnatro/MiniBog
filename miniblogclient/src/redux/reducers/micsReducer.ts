import { ACTION_TYPE } from "../../contants";
import type { ActionTypeReducer } from "../../typeModule";

interface MicsState {
  isAuthenticating: boolean;
  authStatus: { success?: boolean; message?: string } | null;
}

const initState: MicsState = {
  isAuthenticating: false,
  authStatus: null,
};

export default function miscReducer(
  state = initState,
  actions: ActionTypeReducer
) {
  switch (actions.type) {
    case ACTION_TYPE.SET_AUTHENTICATING:
      return { ...state, isAuthenticating: actions.payload };
    case ACTION_TYPE.SET_AUTH_STATUS:
      return { ...state, authStatus: actions.payload };

    default:
      return state;
  }
}
