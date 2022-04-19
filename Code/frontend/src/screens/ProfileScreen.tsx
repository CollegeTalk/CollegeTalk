import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import BusAnimation from "../assets/animations/457-moving-bus.json";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    animationContainer: {
        width: "80%",
        height: "30%"
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: "80%"
    }
});

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Profile">) => (
    <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.animationContainer}>
            <LottieView source={BusAnimation} autoPlay loop />
        </View>
    </View>
);

export default ProfileScreen;
