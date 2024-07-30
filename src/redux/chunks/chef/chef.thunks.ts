import { createAsyncThunk } from '@reduxjs/toolkit';
import * as chefService from '../../../services/chef.service'
import { Chef, UpdatePayload, AddPayload, RemovePayload } from '../../../data/types';


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
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await chefService.updateChef(id, data)
    } catch (err: any) {
      console.log('chef thunks=> could not update chef', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const addChef = createAsyncThunk<Chef, AddPayload<Chef>>(
  'chefs/add',
  async ({ data }, { rejectWithValue }) => {
    try {
      return await chefService.addChef(data)
    } catch (err: any) {
      console.log('chef thunks=> could not add chef', err)
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
