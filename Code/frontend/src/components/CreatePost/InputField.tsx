import { Dispatch, SetStateAction, forwardRef } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { Input } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = StyleSheet.create({
    inputWrapper: {
        paddingHorizontal: 0,
        marginBottom: 20
    },
    inputContainer: {
        borderBottomWidth: 0
    }
});

type InputFieldProps = {
    showError: boolean;
    errorMessage?: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<string>>;
    toggleError?: Dispatch<SetStateAction<boolean>>;
    isLarge: boolean;
};

const InputField = forwardRef(
    (
        {
            showError,
            errorMessage,
            placeholder,
            setText,
            toggleError,
            isLarge
        }: InputFieldProps,
        ref
    ) => (
        <Input
            ref={ref}
            containerStyle={styles.inputWrapper}
            inputContainerStyle={styles.inputContainer}
            inputStyle={{
                width: "100%",
                height: isLarge ? 100 : "auto",
                flex: 1,
                color: "white",
                borderRadius: 15,
                borderColor: primaryColors.text,
                borderWidth: 2,
                paddingHorizontal: 15,
                /* cannot use paddingVertical for multiline */
                paddingTop: 10,
                paddingBottom: 10,
                textAlignVertical: "top"
            }}
            placeholder={placeholder}
            onChangeText={(value: string) => {
                if (toggleError) {
                    toggleError(value === "");
                }
                setText(value);
            }}
            shake={() => showError}
            renderErrorMessage={false}
            errorStyle={{ color: "red" }}
            errorMessage={showError ? errorMessage : undefined}
            multiline
            returnKeyType={!isLarge ? "next" : "default"}
            blurOnSubmit
            onSubmitEditing={() => {
                Keyboard.dismiss();
            }}
        />
    )
);

export default InputField;
