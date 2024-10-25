import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuthHook } from "@/hooks/authHook";
import BottomNavigation from "@/components/home/BottomNavigation";

const _layout = () => {
    const router = useRouter()
    const { isLoggedin, isLoading } = useAuthHook()

    return isLoading
        ? <ActivityIndicator />
        : !isLoggedin
            ? router.push("/login")
            : (
                <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
                    <View style={dashboardStyles.container}>
                        <View style={dashboardStyles.contentContainer}>
                            <Stack screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: "#ffffff00" }
                            }} />
                        </View>
                    </View>
                    <BottomNavigation />
                </View>
            )
};

export default _layout;


const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
    }
})