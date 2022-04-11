import {
    Platform,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    View
} from "react-native";

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 100
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: 250
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});

const CreatePostTitle = () => (
    <View style={styles.center}>
        {/* Write a post title */}
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
        >
            <TextInput style={styles.input} placeholder="Write a post title" />
        </KeyboardAvoidingView>
    </View>
);

export default CreatePostTitle;
