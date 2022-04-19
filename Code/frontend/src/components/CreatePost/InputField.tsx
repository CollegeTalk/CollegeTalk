import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = (isLarge: boolean) =>
    StyleSheet.create({
        container: {
            marginBottom: 20
        },
        inputContainer: {
            borderBottomWidth: 0
        },
        input: {
            width: "100%",
            height: isLarge ? 100 : 50,
            color: "white",
            borderRadius: 15,
            borderColor: primaryColors.text,
            borderWidth: 1,
            paddingHorizontal: 15,
            // TODO: fix this, doesn't work??
            paddingVertical: isLarge ? 30 : 10,
            textAlignVertical: "top"
        }
    });

type InputFieldProps = {
    type?: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<[string, boolean]>>;
    isLarge: boolean;
};

const InputField = ({
    type,
    placeholder,
    setText,
    isLarge
}: InputFieldProps) => (
    <View style={styles(isLarge).container}>
        <Input
            inputContainerStyle={styles(isLarge).inputContainer}
            inputStyle={styles(isLarge).input}
            placeholder={placeholder}
            onChangeText={(value) => setText([value, false])}
            shake={() => true}
            errorStyle={{ color: "red" }}
            errorMessage={type && `Please input a valid ${type}`}
            multiline={isLarge}
        />
    </View>
);

export default InputField;
