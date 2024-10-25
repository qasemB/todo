import httpService from "@/services/_httpService"
import { LoginFormType, RegisterFormType } from "./_types"

export const loginService = (data: LoginFormType) => {
    return httpService("/auth/login", "post", data)
}

export const registerService = (data: RegisterFormType) => {
    return httpService("/auth/register", "post", { password: data.password, phone: data.phone })
}

export const getCurrentUserInfoService = () => {
    return httpService("/auth/user-info", "get")
}
