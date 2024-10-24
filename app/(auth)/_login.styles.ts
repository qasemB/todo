import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    formContainer: {
        elevation: 30,
        backgroundColor: "ghostwhite",
        shadowColor: "gray",
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: "darkgrey",
        alignSelf: "stretch",
        padding: 15,
        borderRadius: 8
    },
    imaeContainer: { justifyContent: "center", alignItems: "center" },
    image: { width: 80, height: 80 },
    inputContainer: {
        flexDirection: "row",
        direction: "rtl",
        gap: 2,
        borderWidth: 1,
        borderColor: "gainsboro",
        borderRadius: 4,
        padding: 4,
        alignItems: "center",
    },
    input: {
        flex: 1,
        direction: "rtl",
        textAlign: "right",
        paddingRight: 10,
        fontFamily: "irsans"
    },
    button: {
        backgroundColor: "dodgerblue",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 7,
        alignSelf: "stretch",
        marginTop: 30,
        shadowColor: "#000",
        elevation: 10,
        flexWrap: "wrap"
    },
    colorWhite: { color: "white" },
})
