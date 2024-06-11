import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterProductApi } from "../../api/product.api";

const initialState = {
  formSearch: {
    name: null,
    status: null,
    categoryId: null,
    brandId: null,
    sizeId: null,
    colorId: null,
    minPrice: 0,
    maxPrice: 5000000,
  },
  productDetails: [],
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
  countProduct: 0,
};

export const filterProductAsync = createAsyncThunk(
  "product/filter",
  async ({ body, params }, thunkApi) => {
    try {
      const response = await filterProductApi(body, params);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeFormSearch: (state, action) => {
      state.formSearch = action.payload;
    },
    changePageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },
    setCountProduct: (state) => {
      state.countProduct += 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
        state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]);
        state.error = null;
      })
      .addCase(filterProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  changeFormSearch,
  changePageSearch,
  setCountProduct,
  clearError,
} = productSlice.actions;
export default productSlice.reducer;
