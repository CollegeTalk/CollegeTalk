import { Ref, Dispatch, SetStateAction, forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Input } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    inputWrapper: {
        paddingHorizontal: 0
    },
    inputContainer: {
        borderBottomWidth: 0
    }
});

type InputFieldProps = {
    showError: boolean;
    errorMessage?: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<[string, boolean]>>;
    isLarge: boolean;
};

const InputField = forwardRef(
    (
        {
            showError,
            errorMessage,
            placeholder,
            setText,
            isLarge
        }: InputFieldProps,
        ref
    ) => (
        <View style={styles.container}>
            <Input
                ref={ref as Ref<TextInput>}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{
                    width: "100%",
                    height: isLarge ? 100 : 50,
                    color: "white",
                    borderRadius: 15,
                    borderColor: primaryColors.text,
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    /* cannot use paddingVertical for multiline */
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlignVertical: "top"
                }}
                placeholder={placeholder}
                onChangeText={(value) => setText([value, false])}
                shake={() => showError}
                renderErrorMessage={showError}
                errorStyle={{ color: "red" }}
                errorMessage={errorMessage}
                multiline={isLarge}
            />
        </View>
    )
);

export default InputField;
