/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACTION_TYPE } from "../../contants";

export const setIsAuthenticating = (payload: boolean) => ({
  type: ACTION_TYPE.SET_AUTHENTICATING,
  payload: payload,
});

export const setAuthStatus = (payload: any) => ({
  type: ACTION_TYPE.SET_AUTH_STATUS,
  payload: payload,
});
