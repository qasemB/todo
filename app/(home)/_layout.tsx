import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useAuthHook } from "@/hooks/authHook";
import FullLoading from "@/components/FullLoading";
import BottomNavigation from "./_partials/BottomNavigation";

const _layout = () => {
    const router = useRouter()
    const { isLoggedin, isLoading } = useAuthHook()

    return isLoading
        ? <FullLoading/>
        : !isLoggedin
            ? router.replace("/login")
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