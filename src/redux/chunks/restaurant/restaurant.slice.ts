import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BasicDish, Chef, Restaurant } from '../../../data/types'
import { addRestaurant, getAllRestaurants, removeRestaurant, updateRestaurant } from './restaurant.thunks'

export interface RestaurantState {
  restaurants: Restaurant[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RestaurantState = {
  restaurants: [],
  status: 'idle',
  error: null,
}

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get all
      .addCase(getAllRestaurants.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.status = 'succeeded'
        state.restaurants = action.payload.map((res) => ({
          ...res,
          chef: (res.chef as Chef).name,
          dishes: (res.dishes as BasicDish[])?.map(dish =>dish.title),
          signatureDish: res.signatureDish,
        }))
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

      // Add Restaurant
      .addCase(addRestaurant.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.status = 'succeeded'
        state.restaurants.push(action.payload)
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

      // Update Restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.status = 'succeeded'
        const index = state.restaurants.findIndex((restaurant) => restaurant._id === action.payload._id)
        if (index !== -1) {
          state.restaurants[index] = action.payload
        }
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

      // Remove Restaurant
      .addCase(removeRestaurant.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeRestaurant.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.restaurants = state.restaurants.filter((restaurant) => restaurant._id !== action.payload._id)
      })
      .addCase(removeRestaurant.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })
  }
})

export default restaurantSlice.reducer