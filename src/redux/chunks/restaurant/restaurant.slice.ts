import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Restaurant } from '../../../data/types';
import { getAllRestaurants } from './restaurant.thunks';

export interface RestaurantState {
  restaurants: Restaurant[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RestaurantState = {
    restaurants: [],
    status: 'idle',
    error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAllRestaurants.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getAllRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
            state.status = 'succeeded'
            state.restaurants = action.payload;
        })
        .addCase(getAllRestaurants.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'An error occurred'
        })
}
})

export const { setRestaurants } = restaurantSlice.actions
export default restaurantSlice.reducer