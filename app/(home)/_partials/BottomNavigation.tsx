import { Pressable, StyleSheet, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { usePathname, useRouter } from "expo-router";




const BottomNavigation = () => {
    const router = useRouter()
    const pathname = usePathname()


    return (
        <View style={{ justifyContent: "space-between", alignItems: "center", padding: 20, paddingHorizontal: 50, flexDirection: "row", borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", height: 70 }}>
            <AntDesign
                name="calendar"
                size={28}
                color={pathname === "/calendar" ? "dodgerblue" : "gray"}
                onPress={() => pathname !== "/calendar" && router.replace("/calendar")}
            />
            <Pressable
                style={styles.addBtn}
                onPress={() => pathname !== "/add-task" && router.replace("/add-task")}
                android_ripple={{ color: "#f2f2f2" }}
            >
                <Entypo
                    name="plus"
                    size={30}
                    color="white"
                />
            </Pressable>
            <AntDesign
                name="home"
                size={28}
                color={pathname === "/dashboard" ? "dodgerblue" : "gray"}
                onPress={() => pathname !== "/dashboard" && router.replace("/dashboard")}
            />
        </View>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    addBtn: {
        flexDirection: "row",
        borderRadius: 50,
        backgroundColor: "dodgerblue",
        padding: 5,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 80,
        top: -30,
        borderWidth: 10,
        borderColor: "#f2f2f2",
    }
})