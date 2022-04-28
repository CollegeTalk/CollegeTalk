import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Text, View } from "../components/Themed";
// import { BottomTabNavScreenProps } from "../../types";
import JaneAnimation from "../assets/animations/20860-person-on-laptop-working-on-laptop.json";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    animationContainer: {
        width: "80%",
        height: "30%"
    }
});

// { navigation }: BottomTabNavScreenProps<"Profile">
const ProfileScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.animationContainer}>
            <LottieView source={JaneAnimation} autoPlay loop />
        </View>
    </View>
);

export default ProfileScreen;
