import { Text, TextProps } from "./Themed";

const MonoText = (props: TextProps) => {
    const { style } = props;
    return <Text {...props} style={[style, { fontFamily: "space-mono" }]} />;
};

export default MonoText;
