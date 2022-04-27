import { Ref, Dispatch, SetStateAction, forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Input } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    inputContainer: {
        borderBottomWidth: 0
    }
});

type InputFieldProps = {
    type?: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<[string, boolean]>>;
    isLarge: boolean;
};

const InputField = forwardRef(
    ({ type, placeholder, setText, isLarge }: InputFieldProps, ref) => (
        <View style={styles.container}>
            <Input
                ref={ref as Ref<TextInput>}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{
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
                }}
                placeholder={placeholder}
                onChangeText={(value) => setText([value, false])}
                shake={() => true}
                errorStyle={{ color: "red" }}
                errorMessage={type && `Please input a valid ${type}`}
                multiline={isLarge}
            />
        </View>
    )
);

export default InputField;
