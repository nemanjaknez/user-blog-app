import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUsers, User, deleteUser } from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id: number, { rejectWithValue }) => {
    try {
      const success = await deleteUser(id);
      if (!success) throw new Error("Deletion failed");
      return id;
    } catch(error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export interface UserState {
  userList: User[];
  fetchUsersLoading: boolean;
  removeUserLoading: boolean;
}

const initialState = {
  userList: [],
  fetchUsersLoading: false,
  removeUserLoading: false
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // TODO: Add any needed reducers here
    // myAwesomeReducer() {}
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUsersLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.fetchUsersLoading = false;
        state.userList.push(...payload);
      })
      .addCase(removeUser.pending, (state) => {
        state.removeUserLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.removeUserLoading = false;
        state.userList = state.userList.filter((user) => user.id !== payload);
      })
  },
});

// TODO: Export any redux actions if needed
// export const { removeUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.userList;
export const loadingUsers = (state: RootState) => state.user.fetchUsersLoading;
export const loadingRemoveUser = (state: RootState) => state.user.removeUserLoading;
