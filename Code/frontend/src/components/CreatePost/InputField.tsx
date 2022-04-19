import { Dispatch, SetStateAction } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View
} from "react-native";

const styles = (isLarge: boolean) =>
    StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 100
        },
        input: {
            width: "100%",
            height: isLarge ? 100 : 50,
            backgroundColor: "#FFF",
            borderRadius: 15,
            borderColor: "#C0C0C0",
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingTop: isLarge ? 5 : 15,
            paddingBottom: isLarge ? 0 : 15
        },
        writeTaskWrapper: {
            position: "absolute",
            bottom: 60,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
        }
    });

type InputFieldProps = {
    placeholder: string;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    isLarge: boolean;
};

const InputField = ({
    placeholder,
    text,
    setText,
    isLarge
}: InputFieldProps) => (
    <View style={styles(isLarge).container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles(isLarge).writeTaskWrapper}
        >
            <TextInput
                style={styles(isLarge).input}
                placeholder={placeholder}
                value={text}
                onChangeText={setText}
            />
        </KeyboardAvoidingView>
    </View>
);

export default InputField;
