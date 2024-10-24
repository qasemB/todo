import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

const FaText = ({ children, style }: { children?: ReactNode, style?: StyleProp<TextStyle> }) => {
    return <Text style={[{ fontFamily: "irsans", fontSize: 15 }, style]}>{children}</Text>
};

export default FaText;