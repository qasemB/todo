import { useUserInfoStore } from "@/stores/userInfoStore"
import { useEffect, useState } from "react"
import { useAsyncMethod } from "./asyncMethodsHook"
import { getCurrentUserInfoService } from "@/app/(auth)/_api"
import { getStringData } from "@/utils/asyncStorage"

export const useAuthHook = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)
    const { setUsrInfo, userInfo } = useUserInfoStore(state => state)

    const { isLoading, runMethod } = useAsyncMethod(async () => {

        if (userInfo) {
            setIsLoggedin(false)
            setIsLoggedin(true)
            return true
        }

        const token = await getStringData("loginToken");
        if (!token) {
            handleLogout()
            return false
        }
        const res = await getCurrentUserInfoService()
        if (res.status === 200) {
            setUsrInfo(res.data)
            setIsLoggedin(true)
        } else {
            handleLogout()
        }
    }, true)

    const handleLogout = () => {
        setUsrInfo(null)
        setIsLoggedin(false)
    }

    useEffect(() => {
        runMethod()
    }, [])

    return { isLoggedin, isLoading }
}