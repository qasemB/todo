import { ComponentProps, ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type FaTextPropsType = ComponentProps<typeof Text>

const FaText = ({ children, style, ...props }: FaTextPropsType) => {
    return <Text style={[{ fontFamily: "irsans", fontSize: 15 }, style]} {...props}>{children}</Text>
};

export default FaText;