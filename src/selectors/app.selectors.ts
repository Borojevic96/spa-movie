import { RootState } from "../store.ts";

export const getMovieSpaData = (state: RootState) => state.movieSpa?.data;
export const getMovieSpaMetaData = (state: RootState) => state.movieSpa?.meta;

export const getLoading = (state: RootState) => state.movieSpa.loading;
export const getSearchKey = (state: RootState) => state.movieSpa.searchQuery;
