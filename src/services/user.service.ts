import bcrypt from 'bcryptjs';
import { LoginData } from "../data/types";
import { httpService } from './http.service';

export const loginUser = async (data: LoginData) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const encryptedData = { ...data, password: hashedPassword }
    return httpService.post('user/login', encryptedData)
}