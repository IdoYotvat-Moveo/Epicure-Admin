import { LoginData, LoginResponse } from "../data/types"
import { httpService } from './http.service'
import CryptoJS from 'crypto-js'

const secretKey = import.meta.env.SECRET_KEY


if (!secretKey) {
    throw new Error('Missing SECRET_KEY environment variable')
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {

    //cryptojs
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString()
    const encryptedData = { ...data, password: encryptedPassword }
    return httpService.post('user/login', encryptedData)
}

