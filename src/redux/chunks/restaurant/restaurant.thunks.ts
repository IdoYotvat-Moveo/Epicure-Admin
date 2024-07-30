import { createAsyncThunk } from "@reduxjs/toolkit"
import * as restaurantService from '../../../services/restaurant.service'
import { Restaurant } from "../../../data/types"

export const getAllRestaurants = createAsyncThunk<Restaurant[]>(
    'restaurant/getAll',
    async () => {
      return await restaurantService.getAllRestaurants()
    }
  )