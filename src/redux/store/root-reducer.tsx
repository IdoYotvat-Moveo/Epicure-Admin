import { combineReducers } from '@reduxjs/toolkit';
import chefReducer from '../chunks/chef/chef.slice'
import dishReducer from '../chunks/dish/dish.slice'
import restaurantReducer from '../chunks/restaurant/restaurant.slice'


const rootReducer = combineReducers({
    chefs: chefReducer,
    restaurants: restaurantReducer,
    dishes: dishReducer,
});
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;