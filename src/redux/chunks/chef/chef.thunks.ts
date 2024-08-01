import { createAsyncThunk } from '@reduxjs/toolkit';
import * as chefService from '../../../services/chef.service'
// import * as restaurantService from '../../../services/restaurant.service'
import { Chef, UpdatePayload, AddPayload, RemovePayload } from '../../../data/types';
import { RootState } from '../../store/root-reducer';


export const getAllChefs = createAsyncThunk<Chef[]>(
  'chefs/getAll',
  async () => {
    try {
      return await chefService.getAllChefs()
    } catch (err) {
      console.log('chef thunks=> could not get all chefs', err)
      return []
    }
  }
)

export const updateChef = createAsyncThunk<Chef, UpdatePayload<Chef>>(
  'chefs/update',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const restaurantIds = data.restaurants?.map((restaurantName) => {
        const restaurant = state.restaurants.restaurants.find(rest => rest.name === restaurantName)
        return restaurant?._id || null
      }).filter((id): id is string => id !== null)
      const chefData: Chef = {
        ...data,
        restaurants: restaurantIds,
      }

      return await chefService.updateChef(id, chefData)
    } catch (err: any) {
      console.log('chef thunks=> could not update chef', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const addChef = createAsyncThunk<Chef, AddPayload<Chef>>(
  'chefs/add',
  async ({ data }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const restaurantIds = data.restaurants?.map((restaurantName) => {
        const restaurant = state.restaurants.restaurants.find(rest => rest.name === restaurantName)
        return restaurant?._id || null
      }).filter((id): id is string => id !== null)

      const chefData: Chef = {
        ...data,
        restaurants: restaurantIds,
      }
      return await chefService.addChef(chefData)
    } catch (err: any) {
      console.log('chef thunks => could not add chef', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const removeChef = createAsyncThunk<Chef, RemovePayload>(
  'chefs/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await chefService.removeChef(id)
    } catch (err: any) {
      console.log('chef thunks=> could not remove chef', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)
