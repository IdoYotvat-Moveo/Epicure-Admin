import { jwtDecode } from "jwt-decode";
import { LoginData, LoginResponse } from "../data/types"
import { httpService } from './http.service'
import CryptoJS from 'crypto-js'


interface DecodedToken {
    id: string;
    name: string;
    role: string;
}

const secretKey = import.meta.env.VITE_SECRET_KEY


if (!secretKey) {
    throw new Error('Missing SECRET_KEY environment variable')
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {

    //cryptojs
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString()
    const encryptedData = { ...data, password: encryptedPassword }
    return httpService.post('user/login', encryptedData)
}

export const checkIsAdmin = (): boolean => {
    const token = sessionStorage.getItem('JWT');
    if (!token) {
        return false
    }
    try {
        // Decode the token
        const decodedToken = jwtDecode<DecodedToken>(token)
        // Check the role
        if (decodedToken.role === 'admin') {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export const isAuthenticated = () => {
    const token = sessionStorage.getItem('JWT')
    console.log(token)
    return token !== null
  }

