import { StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    Center: {
        alignItems: "center"
    }
});

const TextBox = () => (
    <View style={styles.Center}>
        <TextInput>Testing...</TextInput>
    </View>
);

export default TextBox;
