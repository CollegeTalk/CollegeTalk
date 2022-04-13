import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    Center: {
        alignItems: "center"
    }
});

type CreatePostTextBoxProps = {
    bodyText: string;
    setBodyText: Dispatch<SetStateAction<string>>;
};

const CreatePostTextBox = ({
    bodyText,
    setBodyText
}: CreatePostTextBoxProps) => (
    <View style={styles.Center}>
        <TextInput
            placeholder="Type your post here..."
            value={bodyText}
            onChangeText={setBodyText}
        />
    </View>
);

export default CreatePostTextBox;
