import { useCallback, useState } from "react";
import {
    StyleSheet,
    RefreshControl,
    SafeAreaView,
    ScrollView
} from "react-native";
import LottieView from "lottie-react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { primaryColors } from "../constants/Colors";
import BusAnimation from "../assets/animations/457-moving-bus.json";

import PostsFeed from "../components/Home/PostsFeed";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: primaryColors.background
    },
    scrollView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.text
    },
    animationContainer: {
        width: "80%",
        height: "30%",
        backgroundColor: "transparent"
    }
});

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.title}>Home</Text>
                <View style={styles.animationContainer}>
                    <LottieView source={BusAnimation} autoPlay loop />
                </View>
                <PostsFeed />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
