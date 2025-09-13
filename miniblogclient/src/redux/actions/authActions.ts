/* eslint-disable @typescript-eslint/no-explicit-any */
import { Apis, authApis, endpoints } from "../../configs/Apis";
import { ACTION_TYPE } from "../../contants";
import type { AppDispatch } from "../../store/store";
import type { UserSignIn, UserSignUp } from "../../typeModule";
import { setAuthStatus, setIsAuthenticating } from "./micsActions";

export const signUp =
  (userSignUp: UserSignUp) => async (dispatch: AppDispatch) => {
    dispatch({ type: ACTION_TYPE.SET_SIGN_UP });
    dispatch(setIsAuthenticating(true));
    try {
      console.log(userSignUp);
      const res = await Apis.post(endpoints["signUp"], userSignUp);

      if (res.status === 201) {
        dispatch(setAuthStatus({ success: true, message: "SIGN UP SUCCESS" }));
        dispatch({ type: ACTION_TYPE.SIGN_UP_SECCESS });
      }
    } catch (error: any) {
      dispatch(setAuthStatus({ success: false, message: error.message }));
      dispatch({ type: ACTION_TYPE.SIGN_UP_FAIL, payload: error.message });
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  };

export const signIn =
  (userSignIn: UserSignIn) => async (dispatch: AppDispatch) => {
    dispatch(setIsAuthenticating(true));
    dispatch({ type: ACTION_TYPE.SET_SIGN_IN });
    try {
      const resToken = await Apis.post(endpoints["signIn"], userSignIn);

      if (resToken.status === 200) {
        localStorage.setItem("token", resToken.data.token);
        const resUser = await authApis().get(endpoints["current_user"]);

        if (resUser.status === 200) {
          dispatch(
            setAuthStatus({ success: true, message: "SIGN IN SUCCESS" })
          );
          dispatch({
            type: ACTION_TYPE.SIGN_IN_SUCCESS,
            payload: resUser.data,
          });
        }
      }
    } catch (error: any) {
      dispatch(setAuthStatus({ success: false, message: error.message }));
      dispatch({ type: ACTION_TYPE.SIGN_IN_FAIL, payload: error.message });
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({ type: ACTION_TYPE.SIGN_OUT });
  } catch (error: any) {
    dispatch(setAuthStatus({ success: false, message: error.message }));
  }
};
