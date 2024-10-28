import { ComponentProps } from "react";
import { TextInput } from "react-native";

const FaTextInput = ({ style, ...props }: ComponentProps<typeof TextInput>) => {
    return <TextInput style={[{ fontFamily: "irsans", fontSize: 15 }, style]} {...props} />
};

export default FaTextInput;