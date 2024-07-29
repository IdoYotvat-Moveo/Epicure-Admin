import { Restaurant } from "../data/types"
import { httpService } from "./http.service"

export const getAllRestaurants = async ():Promise<Restaurant[]> => {
    return httpService.get('/restaurant')
}