import { ACTION_TYPE } from "../../contants";
import type { ActionTypeReducer } from "../../typeModule";

export interface FilterState {
  kw: string | null;
  username: string | null;
}

const initState: FilterState = {
  kw: null,
  username: null,
};

export default function filterReducer(
  state = initState,
  actions: ActionTypeReducer
) {
  switch (actions.type) {
    case ACTION_TYPE.SET_TEXT_FILTER:
      return {
        ...state,
        kw: actions.payload,
      };
    case ACTION_TYPE.START_FILTER:
      return { ...state, isLoading: true };
    case ACTION_TYPE.APPLY_FILTER:
      return { ...state, ...actions.payload };
    case ACTION_TYPE.RESET_FILTER:
      return initState;
    case ACTION_TYPE.CLEAR_RECENT_SEARCH:
      return { ...state };
    default:
      return state;
  }
}
