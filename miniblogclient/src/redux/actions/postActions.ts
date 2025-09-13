/* eslint-disable @typescript-eslint/no-explicit-any */
import { Apis, authApis, endpoints } from "../../configs/Apis";
import { ACTION_TYPE } from "../../contants";
import type { AppDispatch } from "../../store/store";
import type { Post } from "../../typeModule";

export const getPosts =
  ({ page, size }: { page: number; size: number }) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ACTION_TYPE.GET_POSTS });

    try {
      const res = await Apis.get(endpoints["posts"], {
        params: { page: page - 1, size: size, sort: "id,desc" },
      });
      if (res.status === 200)
        dispatch({ type: ACTION_TYPE.GET_POSTS_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: ACTION_TYPE.GET_POSTS_FAIL, payload: error.message });
    }
  };

export const getPostById = (id: number) => async (dispatch: AppDispatch) => {
  dispatch({ type: ACTION_TYPE.GET_POST_DETAIL });
  try {
    const res = await authApis().get(`${endpoints["posts"]}/${id}`);
    dispatch({
      type: ACTION_TYPE.GET_POST_DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: ACTION_TYPE.GET_POST_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const addPost = (postAdd: Post) => async (dispatch: AppDispatch) => {
  dispatch({ type: ACTION_TYPE.ADD_POST });

  try {
    const res = await authApis().post(endpoints["addPost"], postAdd);
    if (res.status === 201){
      dispatch({ type: ACTION_TYPE.ADD_POST_SUCCESS, payload: res.data });
    }
      
  } catch (error: any) {
    dispatch({ type: ACTION_TYPE.ADD_POST_FAIL, payload: error.message });
  }
};

export const updatePost =
  (postUpdate: Post, id: number) => async (dispatch: AppDispatch) => {
    dispatch({ type: ACTION_TYPE.UPDATE_POST });

    try {
      const res = await authApis().put(
        `${endpoints["addPost"]}/${id}`,
        postUpdate
      );
      if (res.status === 200)
        dispatch({ type: ACTION_TYPE.UPDATE_POST_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: ACTION_TYPE.UPDATE_POST_FAIL, payload: error.message });
    }
  };

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
  dispatch({ type: ACTION_TYPE.DELETE_POST });

  try {
    const res = await authApis().delete(`${endpoints["addPost"]}/${id}`);
    if (res.status === 204)
      dispatch({ type: ACTION_TYPE.DELETE_POST_SUCCESS, payload: id });
  } catch (error: any) {
    dispatch({ type: ACTION_TYPE.DELETE_POST_FAIL, payload: error.message });
  }
};
