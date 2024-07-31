import { Chef } from "../data/types";
import { httpService } from "./http.service";

//get
export const getAllChefs = async (): Promise<Chef[]> => {
    return httpService.get('chef')
}

//update
export const updateChef = async (chefId: string, chefData: Chef): Promise<Chef> => {
    return httpService.put(`chef/${chefId}`,chefData)
}

//create
export const addChef = async ( chefData: Chef): Promise<Chef> => {
    return httpService.post(`chef/`,chefData)
}

//delete
export const removeChef = async (chefId: string): Promise<Chef> => {
    return httpService.delete(`chef/${chefId}`)
}