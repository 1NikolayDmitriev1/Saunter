import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../services/firebase";
import { ref, set, get, child } from "firebase/database";

interface Route {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  markers: number[][];
  length: string;
  isFavorite: boolean;
}

interface RootState {
  routes: Route[];
  selectedRoute: Route | null;
  searchKeyword: string;
  markers: number[][];
  totalDistance: string;
}

interface FetchDataError {
  message: string;
}

export const fetchData = createAsyncThunk<
  Route[],
  void,
  { rejectValue: FetchDataError }
>("data/fetchData", async (_, thunkAPI) => {
  try {
    const snapshot = await get(child(ref(database), "routes"));
    if (snapshot.exists()) {
      return snapshot.val() as Route[];
    } else {
      throw new Error("No data available");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const writeData = createAsyncThunk<
  Route[],
  Route[],
  { rejectValue: FetchDataError }
>("data/writeData", async (data: Route[], thunkAPI) => {
  try {
    await set(ref(database, "routes"), data);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const deleteData = createAsyncThunk<
  Route[],
  Route[],
  { rejectValue: FetchDataError }
>("data/deleteData", async (data: Route[], thunkAPI) => {
  try {
    await set(ref(database, "routes"), data);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

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
    setSearchKeyword: (state: RootState, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    addMarker: (state: RootState, action: PayloadAction<number[][]>) => {
      state.markers = action.payload;
    },
    updateTotalDistance: (state: RootState, action: PayloadAction<string>) => {
      state.totalDistance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(writeData.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.routes = action.payload;
      });
  },
});

export default dataSlice.reducer;
