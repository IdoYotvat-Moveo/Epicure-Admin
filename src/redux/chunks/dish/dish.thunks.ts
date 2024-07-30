import { createAsyncThunk } from "@reduxjs/toolkit"
import * as dishService from '../../../services/dish.service'
import { Dish, UpdatePayload, AddPayload, RemovePayload } from "../../../data/types"

export const getAllDishes = createAsyncThunk<Dish[]>(
    'dish/getAll',
    async () => {
      return await dishService.getAllDishes()
    }
  )

export const updateDish = createAsyncThunk<Dish,UpdatePayload<Dish>>(
    'dish/update',
    async ({ id, data }) => {
      return await dishService.updateDish(id, data)
    }
  )

  export const addDish = createAsyncThunk<Dish,AddPayload<Dish>>(
    'dish/add',
    async ({data }) => {
      return await dishService.addDish(data)
    }
  )

  export const removeDish = createAsyncThunk<Dish,RemovePayload>(
    'dish/remove',
    async ({id }) => {
      return await dishService.removeDish(id)
    }
  )