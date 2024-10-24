import axios, { AxiosHeaderValue, AxiosHeaders, AxiosProgressEvent, AxiosResponse, RawAxiosRequestHeaders } from "axios"
import config from './config.json'
import { Alert } from "react-native"

export const apiPath = config.onlinePath

axios.interceptors.response.use((res)=>{
    return res
},(error)=>{
    const res = error?.response
    if (!res?.status) {
        Alert.alert("خطا", `مشکلی در ارتباط با سرور وجود دارد..`)
        // showToast(`مشکلی در ارتباط با سرور وجود دارد..`, "error")
    }
    
    if (res?.status >= 500){
        Alert.alert("خطا", `مشکلی از سمت سرور رخ داده است...(${res?.status})`)
        // showToast(`مشکلی از سمت سرور رخ داده است...(${res?.status})`, "error")
    }else if (res?.status === 401) {
        Alert.alert("خطا", `ورود غیر مجاز (${res?.status})`)
        // showToast(`ورود غیر مجاز (${res?.status})`, "error")
    }else if (res?.status > 200) {
        const message = res?.data?.message
        
        if (message) Alert.alert("", message)
        else Alert.alert("خطا", `در ورود اطلاعات دقت کنید`)
        
    }
    return Promise.resolve(error)
})

const httpService = (

    url : string, 
    method : "post" | "get" | "patch" | "put" | "delete", 
    data ?: any, 
    onUploadProgress?: (e: AxiosProgressEvent)=>void,
    headers?: AxiosHeaders | (Partial<RawAxiosRequestHeaders & {
        Accept: AxiosHeaderValue;
        "Content-Length": AxiosHeaderValue;
        "User-Agent": AxiosHeaderValue;
        "Content-Encoding": AxiosHeaderValue;
        Authorization: AxiosHeaderValue;
    }> | undefined)
) : Promise<AxiosResponse<any, any>> =>{

    // const tokenInfo = localStorage.getItem(GLOBAL_CONST.login_token_name)
    const tokenInfo = ""

    if (!headers) {
        headers = {
            Authorization : tokenInfo ? `Bearer ${tokenInfo}` : null,
            'Content-Type' : "application/json"
        }
    }else{
        headers = {
            Authorization : tokenInfo ? `Bearer ${tokenInfo}` : null,
            ...headers
        }
    }

    return axios({
        baseURL: apiPath+"/api/",
        url,
        method,
        data,
        headers,
        onUploadProgress: onUploadProgress
    })
}
export default httpService