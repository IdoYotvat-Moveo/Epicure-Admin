import { createAsyncThunk } from "@reduxjs/toolkit"
import * as dishService from '../../../services/dish.service'
import { Dish } from "../../../data/types"

export const getAllDishes = createAsyncThunk<Dish[]>(
    'dish/getAll',
    async () => {
      const dishes = await dishService.getAllDishes()
      return dishes
    }
  )