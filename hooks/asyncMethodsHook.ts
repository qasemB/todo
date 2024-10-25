import { useState } from "react"

export const useAsyncMethod = (callback: (params?: any) => Promise<any>, initLoading: boolean = false)=>{
    const [isLoading, setIsLoading] = useState(initLoading)
    const runMethod = async (params?: any)=>{
        setIsLoading(true)
        await callback(params)
        setIsLoading(false)
    }
    return{runMethod, isLoading}
}