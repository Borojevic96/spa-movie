import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieRecord, MovieMeta } from "../types";

interface MovieSpaArray {
  data: MovieRecord[];
  meta: MovieMeta;
  loading: boolean;
  searchQuery: string;
}

const initialState: MovieSpaArray = {
  data: [],
  meta: { page: 1, total_pages: 1, total_results: 1 },
  loading: false,
  searchQuery: "",
};

export const movieSpaState = createSlice({
  name: "movieSpa",
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<MovieRecord[]>) => {
      state.data = action.payload;
    },
    storeMeta: (state, action: PayloadAction<MovieMeta>) => {
      state.meta = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { storeData, storeMeta, setLoading, setSearchQuery } =
  movieSpaState.actions;

export default movieSpaState;
