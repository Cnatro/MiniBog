/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import type { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import postsReducer from "../redux/reducers/postReducer";
import authReducer from "../redux/reducers/authReducer";
import miscReducer from "../redux/reducers/micsReducer";
import filterReducer from "../redux/reducers/filterReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  misc: miscReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store as any);
export default store;
