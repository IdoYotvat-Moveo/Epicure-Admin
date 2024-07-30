import { createAsyncThunk } from '@reduxjs/toolkit';
import * as chefService from '../../../services/chef.service'
import { Chef, UpdatePayload, AddPayload, RemovePayload } from '../../../data/types';



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

export const addChef = createAsyncThunk<Chef,AddPayload<Chef>>(
  'chefs/add',
  async ({data }) => {
    return await chefService.addChef(data)
  }
)
export const removeChef = createAsyncThunk<Chef,RemovePayload>(
  'chefs/remove',
  async ({id }) => {
    return await chefService.removeChef(id)
  }
)
