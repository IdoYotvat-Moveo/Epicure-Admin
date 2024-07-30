import { createAsyncThunk } from "@reduxjs/toolkit"
import * as dishService from '../../../services/dish.service'
import { Dish, UpdatePayload, AddPayload, RemovePayload } from "../../../data/types"

export const getAllDishes = createAsyncThunk<Dish[]>(
  'dish/getAll',
  async () => {
    try {
      return await dishService.getAllDishes()
    } catch (err) {
      console.log('dish thunks=>could not get all dishes')
      return []
    }
  }
)

export const updateDish = createAsyncThunk<Dish, UpdatePayload<Dish>>(
  'dish/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await dishService.updateDish(id, data)
    } catch (err: any) {
      console.log('dish thunks=> could not update dish', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const addDish = createAsyncThunk<Dish, AddPayload<Dish>>(
  'dish/add',
  async ({ data }, { rejectWithValue }) => {
    try {
      return await dishService.addDish(data)
    } catch (err: any) {
      console.log('dish thunks=> could not add dish', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const removeDish = createAsyncThunk<Dish, RemovePayload>(
  'dish/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await dishService.removeDish(id)
    } catch (err: any) {
      console.log('dish thunks=> could not remove dish', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)