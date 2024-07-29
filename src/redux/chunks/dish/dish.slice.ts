import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dish } from '../../../data/types'
import { getAllDishes } from './dish.thunks';

export interface DishState {
    dishes: Dish[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;

}

const initialState: DishState = {
    dishes: [],
    status: 'idle',
    error: null,
};

const dishSlice = createSlice({
    name: 'dish',
    initialState,
    reducers: {
        setDishes: (state, action: PayloadAction<Dish[]>) => {
            state.dishes = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDishes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
                state.status = 'succeeded'
                state.dishes = action.payload;
            })
            .addCase(getAllDishes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'An error occurred'
            })
    }
})

export const { setDishes } = dishSlice.actions
export default dishSlice.reducer