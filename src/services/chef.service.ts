import { Chef } from "../data/types";
import { httpService } from "./http.service";

export const getAllChefs = async ():Promise<Chef[]> => {
    return httpService.get('/chef')
}