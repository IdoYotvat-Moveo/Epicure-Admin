import { createAsyncThunk } from "@reduxjs/toolkit"
import * as restaurantService from '../../../services/restaurant.service'
import { Restaurant, UpdatePayload, AddPayload, RemovePayload } from "../../../data/types"

export const getAllRestaurants = createAsyncThunk<Restaurant[]>(
  'restaurant/getAll',
  async () => {
    try {
      return await restaurantService.getAllRestaurants()
    } catch (err) {
      console.log('dish thunks=>could not get all dishes', err)
      return []
    }
  }
)

export const updateRestaurant = createAsyncThunk<Restaurant, UpdatePayload<Restaurant>>(
  'restaurant/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await restaurantService.updateRestaurant(id, data)
    } catch (err: any) {
      console.log('restaurant thunks=> could not update restaurant', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const addRestaurant = createAsyncThunk<Restaurant, AddPayload<Restaurant>>(
  'restaurant/add',
  async ({ data }, { rejectWithValue }) => {
    try {
      return await restaurantService.addRestaurant(data)
    } catch (err: any) {
      console.log('restaurant thunks=> could not add restaurant', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const removeRestaurant = createAsyncThunk<Restaurant, RemovePayload>(
  'restaurant/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await restaurantService.removeRestaurant(id)
    } catch (err: any) {
      console.log('restaurant thunks=> could not remove restaurant', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)