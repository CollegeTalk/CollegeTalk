import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import LottieView from "lottie-react-native";

import { primaryColors } from "../constants/Colors";
// import { RootTabScreenProps } from "../../types";
import BusAnimation from "../assets/animations/457-moving-bus.json";

import { Text, View } from "../components/Themed";
import CreatePost from "../components/CreatePost/CreatePost";

const styles = StyleSheet.create({
    viewWrapper: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: primaryColors.background,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        width: "100%",
        fontSize: 32,
        fontWeight: "bold",
        color: primaryColors.text,
        marginTop: 10
    },
    animationContainer: {
        width: "80%",
        height: "30%",
        backgroundColor: "transparent",
        alignItems: "center"
    }
});

// { navigation }: RootTabScreenProps<"CreatePost">
const CreatePostScreen = () => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.viewWrapper}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Ask a Question:</Text>
                <CreatePost />
                <View style={styles.animationContainer}>
                    <LottieView source={BusAnimation} autoPlay loop />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default CreatePostScreen;
