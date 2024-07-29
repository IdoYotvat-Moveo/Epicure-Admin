import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chef } from '../../../data/types';
import { getAllChefs } from './chef.thunks'

export interface ChefState {
    chefs: Chef[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

const initialState: ChefState = {
  chefs: [],
  status: 'idle',
  error: null,
};

const chefSlice = createSlice({
  name: 'chef',
  initialState,
  reducers: {
    setChefs: (state, action: PayloadAction<Chef[]>) => {
      state.chefs = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChefs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllChefs.fulfilled, (state, action: PayloadAction<Chef[]>) => {
        state.status = 'succeeded'
        state.chefs = action.payload;
      })
      .addCase(getAllChefs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })
  }
})

export const { setChefs } = chefSlice.actions
export default chefSlice.reducer