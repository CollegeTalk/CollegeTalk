import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

// import { BottomTabNavScreenProps } from "../../types";
import JaneAnimation from "../assets/animations/20860-person-on-laptop-working-on-laptop.json";
import { primaryColors } from "../constants/Colors";

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
