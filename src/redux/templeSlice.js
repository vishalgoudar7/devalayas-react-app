import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = "94c4c11bfac761ba896de08bd383ca187d4e4dc4";

export const fetchTemples = createAsyncThunk(
  "temple/fetchTemples",
  async ({ page = 1, search = "" }) => {
    const res = await fetch(
      `https://beta.devalayas.com/api/v1/devotee/temple/?page=${page}&page_size=25&search=${search}`,
      {
        headers: { Authorization: "Token " + token },
      }
    );
    const data = await res.json();
    return data;
  }
);

const templeSlice = createSlice({
  name: "temple",
  initialState: {
    temples: [],
    selectedTemple: null,
    page: 1,
    search: "",
    loading: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemples.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemples.fulfilled, (state, action) => {
        state.temples = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchTemples.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearch, setPage } = templeSlice.actions;
export default templeSlice.reducer;
