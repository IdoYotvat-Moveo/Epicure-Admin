import { createAsyncThunk } from '@reduxjs/toolkit';
import * as chefService from '../../../services/chef.service'
import { Chef, UpdatePayload, addPayload, removePayload } from '../../../data/types';



export const getAllChefs = createAsyncThunk<Chef[]>(
  'chefs/getAll',
  async () => {
    return await chefService.getAllChefs()
  }
)

export const updateChef = createAsyncThunk<Chef, UpdatePayload<Chef>>(
  'chefs/update',
  async ({ id, data }) => {
    return await chefService.updateChef(id, data)
  }
)

export const addChef = createAsyncThunk<Chef,addPayload<Chef>>(
  'chefs/add',
  async ({data }) => {
    return await chefService.addChef(data)
  }
)
export const removeChef = createAsyncThunk<Chef,removePayload>(
  'chefs/remove',
  async ({id }) => {
    return await chefService.removeChef(id)
  }
)
