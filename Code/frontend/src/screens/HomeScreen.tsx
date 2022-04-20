import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { primaryColors } from "../constants/Colors";
import BusAnimation from "../assets/animations/457-moving-bus.json";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: primaryColors.background,
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.text
    },
    animationContainer: {
        width: "80%",
        height: "30%",
        backgroundColor: "rgba(0, 0, 0, 0)"
    }
});

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => (
    <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.animationContainer}>
            <LottieView source={BusAnimation} autoPlay loop />
        </View>
    </View>
);

export default HomeScreen;
