import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";

import { primaryColors } from "../constants/Colors";
import { RootTabScreenProps } from "../../types";

import { Text, View } from "../components/Themed";
import CreatePost from "../components/CreatePost/CreatePost";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: primaryColors.background,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: primaryColors.text,
        marginTop: 10
    },
    viewWrapper: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center"
    }
});

const CreatePostScreen = ({ navigation }: RootTabScreenProps<"CreatePost">) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.viewWrapper}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Ask a Question:</Text>
                <CreatePost />
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default CreatePostScreen;
