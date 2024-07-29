import { Dish } from "../data/types"
import { httpService } from "./http.service"

export const getAllDishes = async ():Promise<Dish[]> => {
    return httpService.get('/dish')
}