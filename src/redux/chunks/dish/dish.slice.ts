import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dish } from '../../../data/types'
import { addDish, getAllDishes, removeDish, updateDish } from './dish.thunks'

export interface DishState {
    dishes: Dish[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null

}

const initialState: DishState = {
    dishes: [],
    status: 'idle',
    error: null,
}

const dishSlice = createSlice({
    name: 'dish',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get all
            .addCase(getAllDishes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
                state.status = 'succeeded'
                state.dishes = action.payload.map(dish => ({
                    ...dish,
                    // restaurant:dish.restaurant?.name
                    restaurant: typeof dish.restaurant === 'object' && dish.restaurant !== null
                        ? dish.restaurant.name
                        : dish.restaurant

                }))
            })
            .addCase(getAllDishes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'An error occurred'
            })

            // Add Dish
            .addCase(addDish.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addDish.fulfilled, (state, action: PayloadAction<Dish>) => {
                state.status = 'succeeded'
                state.dishes.push(action.payload)
            })
            .addCase(addDish.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'An error occurred'
            })

            // Update Dish
            .addCase(updateDish.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateDish.fulfilled, (state, action: PayloadAction<Dish>) => {
                state.status = 'succeeded'
                const index = state.dishes.findIndex((dish) => dish._id === action.payload._id)
                if (index !== -1) {
                    state.dishes[index] = action.payload
                }
            })
            .addCase(updateDish.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'An error occurred'
            })

            // Remove Dish
            .addCase(removeDish.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeDish.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.dishes = state.dishes.filter((dish) => dish._id !== action.payload._id)
            })
            .addCase(removeDish.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'An error occurred'
            })
    }
})

export default dishSlice.reducer