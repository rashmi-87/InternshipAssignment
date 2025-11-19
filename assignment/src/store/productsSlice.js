import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        id: Date.now(),
        ...action.payload,
      });
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
