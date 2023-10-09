import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../services/firebase";
import { ref, set, get, child } from "firebase/database";
import { RootState, Route } from "../types/types";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const snapshot = await get(child(ref(database), "routes"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error("No data available");
  }
});

export const writeData = createAsyncThunk(
  "data/writeData",
  async (data: Route[]) => {
    await set(ref(database, "routes"), data);
  }
);
export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (data: Route[]) => {
    await set(ref(database, "routes"), data);
    return data;
  }
);

const initialState: RootState = {
  routes: [],
  selectedRoute: null,
  searchKeyword: "",
  markers: [],
  totalDistance: "0",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    selectRoute: (state: RootState, action: PayloadAction<Route | null>) => {
      state.selectedRoute = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    addMarker: (state: RootState, action: PayloadAction<number[][]>) => {
      state.markers = action.payload;
    },
    updateTotalDistance: (state, action: PayloadAction<string>) => {
      state.totalDistance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(writeData.fulfilled, () => {})
      .addCase(deleteData.fulfilled, (state, action) => {
        state.routes = action.payload;
      });
  },
});

export default dataSlice.reducer;
