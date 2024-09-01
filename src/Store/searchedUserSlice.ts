import { ISearchedUser } from "@/ApiServices/interfaces/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISearchedUser[] = [];

const searchedUserSlice = createSlice({
  name: "searchedUser",
  initialState,
  reducers: {
    addSearchedUser: (state, action: PayloadAction<ISearchedUser>) => {
      if (!state.find((user) => user.userName === action.payload.userName)) {
        state.push(action.payload);
      }
    },
    removeSeachedUser: (state, action: PayloadAction<string>) => {
      // state.filter((user) => user.userName !== action.payload);
      return state.filter((user) => user.userName !== action.payload);
    },
    removeAllSearchedUser: (state) => {
      return [];
    },
  },
});

export const { addSearchedUser, removeSeachedUser, removeAllSearchedUser } =
  searchedUserSlice.actions;
export default searchedUserSlice.reducer;
