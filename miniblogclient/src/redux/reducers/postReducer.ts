import { ACTION_TYPE } from "../../contants";
import type { ActionTypeReducer, Post } from "../../typeModule";

interface PostState {
  isLoading: boolean;
  posts: { data: Post[] | null; total: number };
  postDetail: Post | null;
  error: string | null;
}

const initState: PostState = {
  isLoading: false,
  posts: { data: null, total: 0 },
  postDetail: null,
  error: null,
};

export default function postsReducer(
  state = initState,
  actions: ActionTypeReducer
) {
  switch (actions.type) {
    case ACTION_TYPE.GET_POSTS:
      return { ...state, isLoading: true };
    case ACTION_TYPE.GET_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: actions.payload };
    case ACTION_TYPE.GET_POSTS_FAIL:
      return { ...state, isLoading: false, error: actions.payload };

    case ACTION_TYPE.ADD_POST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: {
          ...state.posts,
          data: state.posts.data
            ? [actions.payload, ...state.posts.data]
            : [actions.payload],
          total: state.posts.total + 1,
        },
      };
    case ACTION_TYPE.ADD_POST_FAIL:
      return { ...state, isLoading: false, error: actions.payload };

    case ACTION_TYPE.UPDATE_POST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.UPDATE_POST_SUCCESS:
      return { ...state, isLoading: false, postDetail: actions.payload };
    case ACTION_TYPE.UPDATE_POST_FAIL:
      return { ...state, isLoading: false, error: actions.payload };

    case ACTION_TYPE.DELETE_POST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: {
          ...state.posts,
          data: state.posts.data?.filter((p) => p.id !== actions.payload) || [],
          total: state.posts.total > 0 ? state.posts.total - 1 : 0,
        },
      };
    case ACTION_TYPE.DELETE_POST_FAIL:
      return { ...state, isLoading: false, error: actions.payload };

    case ACTION_TYPE.GET_POST_DETAIL:
      return { ...state, isLoading: true, error: null, posts: null };
    case ACTION_TYPE.GET_POST_DETAIL_SUCCESS:
      return { ...state, isLoading: false, postDetail: actions.payload };

    case ACTION_TYPE.GET_POST_DETAIL_FAIL:
      return { ...state, isLoading: false, error: actions.payload };
    default:
      return state;
  }
}
