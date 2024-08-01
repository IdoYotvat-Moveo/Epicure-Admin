import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chef } from '../../../data/types'
import { addChef, getAllChefs, removeChef, updateChef } from './chef.thunks'

export interface ChefState {
    chefs: Chef[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
  }

const initialState: ChefState = {
  chefs: [],
  status: 'idle',
  error: null,
}

const chefSlice = createSlice({
  name: 'chef',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //get all
      .addCase(getAllChefs.pending, (state) => {
        state.status = 'loading'
      })
      // .addCase(getAllChefs.fulfilled, (state, action: PayloadAction<Chef[]>) => {
      //   state.status = 'succeeded'
      //   console.log(action.payload)
      //   state.chefs = action.payload
      // })
      .addCase(getAllChefs.fulfilled, (state, action: PayloadAction<Chef[]>) => {
        state.status = 'succeeded';
        
        // Transform the chefs array to include restaurant names
        state.chefs = action.payload.map(chef => ({
            ...chef,
            restaurants: chef.restaurants?.map(res => res.name)
        }))
        // console.log(state.chefs)
    })
      .addCase(getAllChefs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

      //add chef 
      .addCase(addChef.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addChef.fulfilled, (state, action: PayloadAction<Chef>) => {
        state.status = 'succeeded'
        state.chefs.push(action.payload)
      })
      .addCase(addChef.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

       // Update chef
       .addCase(updateChef.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateChef.fulfilled, (state, action: PayloadAction<Chef>) => {
        state.status = 'succeeded'
        const index = state.chefs.findIndex((chef) => chef._id === action.payload._id)
        if (index !== -1) {
          state.chefs[index] = action.payload
        }
      })
      .addCase(updateChef.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })

      // Remove chef
      .addCase(removeChef.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeChef.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.chefs = state.chefs.filter((chef) => chef._id !== action.payload._id)
      })
      .addCase(removeChef.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'An error occurred'
      })
  }
})

export default chefSlice.reducer