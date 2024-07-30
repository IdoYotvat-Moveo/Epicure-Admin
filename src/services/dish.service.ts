import { Dish } from "../data/types"
import { httpService } from "./http.service"

//get
export const getAllDishes = async ():Promise<Dish[]> => {
    return httpService.get('/dish')
}

//update
export const updateDish = async (dishId: string, dishData: Dish): Promise<Dish> => {
    return httpService.put(`/dish/${dishId}`,dishData)
}

//create
export const addDish = async (dishData: Dish): Promise<Dish> => {
    return httpService.post(`/dish/`,dishData)
}

//delete
export const removeDish = async (dishId: string): Promise<Dish> => {
    return httpService.delete(`/dish/${dishId}`)
}