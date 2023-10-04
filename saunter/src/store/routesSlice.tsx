import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../services/firebase";
import { ref, set, get, child } from "firebase/database";
import { RootState } from "../types/types";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const snapshot = await get(child(ref(database), "routs"));
  if (snapshot.exists()) {
    console.log("snapshot.val()", snapshot.val());

    return snapshot.val();
  } else {
    throw new Error("No data available");
  }
});

export const writeData = createAsyncThunk(
  "data/writeData",
  async (data: object) => {
    await set(ref(database, "routs"), data);
  }
);
export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (data: object) => {
    await set(ref(database, "routs"), data);
  }
);
const initialState: RootState = {
  routes: [],
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(writeData.fulfilled, (state, action) => {})
      .addCase(deleteData.fulfilled, (state, action) => {});
  },
});

export default dataSlice.reducer;
