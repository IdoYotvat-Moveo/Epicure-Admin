// import bcrypt from 'bcryptjs';
import { LoginData, LoginResponse } from "../data/types";
import { httpService } from './http.service';
import CryptoJS from 'crypto-js'


// const saltRounds = 10
const secretKey = import.meta.env.SECRET_KEY || 'your-secret-key'

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {

    //bcrypt
    // const hashedPassword = await bcrypt.hash(data.password, saltRounds)
    // console.log(hashedPassword)
    // const encryptedData = { ...data, password: hashedPassword }

    //cryptojs
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString()
    console.log(encryptedPassword)
    const encryptedData = { ...data, password: encryptedPassword }
    return httpService.post('user/login', encryptedData)
}

