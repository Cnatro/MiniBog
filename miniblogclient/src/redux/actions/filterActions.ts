/* eslint-disable @typescript-eslint/no-explicit-any */
import { Apis, endpoints } from "../../configs/Apis";
import { ACTION_TYPE } from "../../contants";
import type { AppDispatch } from "../../store/store";

export const filterProducts = (filterParams: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ACTION_TYPE.START_FILTER });
    dispatch({ type: ACTION_TYPE.APPLY_FILTER, payload: filterParams });
    dispatch({ type: ACTION_TYPE.SET_TEXT_FILTER, payload: filterParams.q });
    try {
      const res = await Apis.get(endpoints["posts"], {
        params: filterParams,
      });
      dispatch({ type: ACTION_TYPE.GET_POSTS_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: ACTION_TYPE.GET_POSTS_FAIL, payload: error.message });
    }
  };
};
