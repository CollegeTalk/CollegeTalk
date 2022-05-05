import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import LottieView from "lottie-react-native";

import { primaryColors } from "../constants/Colors";
import { BottomTabNavScreenProps } from "../../types";
import BusAnimation from "../assets/animations/457-moving-bus.json";

import { Text, View } from "../components/Themed";
import CreatePost from "../components/CreatePost/CreatePost";

const styles = StyleSheet.create({
    viewWrapper: {
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

const CreatePostScreen = ({
    navigation
}: BottomTabNavScreenProps<"CreatePost">) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.viewWrapper}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Ask a Question:</Text>
                <CreatePost {...{ navigation }} />
                <View style={styles.animationContainer}>
                    <LottieView source={BusAnimation} autoPlay loop />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default CreatePostScreen;
