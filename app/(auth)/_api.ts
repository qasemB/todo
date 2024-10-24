import httpService from "@/services/_httpService"
import { LoginFormType } from "./_types"

export const loginService = (data: LoginFormType)=>{
    return httpService("/auth/login", "post", data)
}

