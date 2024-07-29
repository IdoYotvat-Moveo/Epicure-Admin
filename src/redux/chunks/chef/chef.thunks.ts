import { createAsyncThunk } from '@reduxjs/toolkit';
import * as chefService from '../../../services/chef.service'
import { Chef } from '../../../data/types';

export const getAllChefs = createAsyncThunk<Chef[]>(
  'chefs/getAll',
  async () => {
    const chefs = await chefService.getAllChefs()
    return chefs
  }
)