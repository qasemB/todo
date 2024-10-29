import FullLoading from '@/components/FullLoading';
import { useAsyncMethod } from '@/hooks/asyncMethodsHook';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { removeStorageData } from '@/utils/asyncStorage';
import { Redirect, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

const Logout = () => {
    const router = useRouter()
    const { userInfo , setUsrInfo} = useUserInfoStore(state => state)
    const { isLoading, runMethod: handleLogout } = useAsyncMethod(async () => {
        await removeStorageData("loginToken")
        setUsrInfo(null)
    }, true)

    useEffect(() => {
        handleLogout()
    }, [])

    return isLoading ? <FullLoading /> : router.replace("/login");

};

export default Logout;