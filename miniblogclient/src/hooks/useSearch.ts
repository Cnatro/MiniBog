import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { useAppSelector } from "./hooks";
import type { FilterState } from "../redux/reducers/filterReducer";

const selectFilterData = createSelector(
  (state: RootState) => state.filter,
  (filter: FilterState) => ({
    filter,
    isLoading: false,
  })
);

export const useSearch = () => useAppSelector(selectFilterData);
