import { Restaurant } from "../data/types"
import { httpService } from "./http.service"

//get
export const getAllRestaurants = async ():Promise<Restaurant[]> => {
    return httpService.get('restaurant')
}

//update
export const updateRestaurant = async (restaurantId: string, restauranData: Restaurant): Promise<Restaurant> => {
    return httpService.put(`restaurant/${restaurantId}`,restauranData)
}

//create
export const addRestaurant = async (restauranData: Restaurant): Promise<Restaurant> => {
    console.log(restauranData)
    return httpService.post(`restaurant/`,restauranData)
}

//delete
export const removeRestaurant = async (restaurantId: string): Promise<Restaurant> => {
    return httpService.delete(`restaurant/${restaurantId}`)
}