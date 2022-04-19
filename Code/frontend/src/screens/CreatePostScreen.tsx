import { StyleSheet } from "react-native";

import { primaryColors } from "../constants/Colors";

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
        marginVertical: 10
    }
});

const CreatePostScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Ask a Question:</Text>
        <CreatePost />
    </View>
);

export default CreatePostScreen;
