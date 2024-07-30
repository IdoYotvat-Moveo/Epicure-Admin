import { createAsyncThunk } from "@reduxjs/toolkit"
import * as restaurantService from '../../../services/restaurant.service'
import { Restaurant, UpdatePayload, addPayload, removePayload } from "../../../data/types"

export const getAllRestaurants = createAsyncThunk<Restaurant[]>(
    'restaurant/getAll',
    async () => {
      return await restaurantService.getAllRestaurants()
    }
  )

  export const updateRestaurant = createAsyncThunk<Restaurant,UpdatePayload<Restaurant>>(
    'restaurant/update',
    async ({ id, data }) => {
      return await restaurantService.updateRestaurant(id, data)
    }
  )

  export const addRestaurant = createAsyncThunk<Restaurant,addPayload<Restaurant>>(
    'restaurant/add',
    async ({data }) => {
      return await restaurantService.addRestaurant(data)
    }
  )

  export const removeRestaurant = createAsyncThunk<Restaurant,removePayload>(
    'restaurant/remove',
    async ({id }) => {
      return await restaurantService.removeRestaurant(id)
    }
  )