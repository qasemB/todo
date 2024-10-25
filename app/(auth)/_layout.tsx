import { Stack, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAuthHook } from "@/hooks/authHook";

const _layout = () => {
    const router = useRouter()
    const { isLoggedin, isLoading } = useAuthHook()

    return isLoading
        ? <ActivityIndicator />
        : isLoggedin
            ? router.push("/dashboard")
            : <Stack screenOptions={{
                headerShown: false
            }} />


};

export default _layout;