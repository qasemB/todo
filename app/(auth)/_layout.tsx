import { Stack, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAuthHook } from "@/hooks/authHook";
import FullLoading from "@/components/FullLoading";

const _layout = () => {
    const router = useRouter()
    const { isLoggedin, isLoading } = useAuthHook()

    return isLoading
        ? <FullLoading />
        : isLoggedin
            ? router.replace("/dashboard")
            : <Stack screenOptions={{
                headerShown: false
            }} />
};

export default _layout;