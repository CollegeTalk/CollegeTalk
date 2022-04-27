import { useCallback, useState, useEffect } from "react";
import {
    StyleSheet,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView
} from "react-native";

import { Text } from "../components/Themed";
import { RootTabScreenProps, Post } from "../../types";
import { primaryColors } from "../constants/Colors";

import PostsFeed from "../components/Home/PostsFeed";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: primaryColors.background
    },
    scrollView: {
        width: "100%",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 30
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.text
    }
});

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
    const controller = new AbortController();

    const [refreshing, setRefreshing] = useState(false);

    const [[posts, initialFetched], setPosts] = useState([[], false] as [
        Post[],
        boolean
    ]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/posts`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    signal: controller.signal
                });
                const postsData = await response.json();
                setRefreshing(false);
                setPosts([postsData, true]);
            } catch (err: any) {
                if (!controller.signal.aborted) {
                    Alert.alert(`Something went wrong! ${err}`);
                }
            }
        };

        navigation.addListener("focus", () => fetchPosts());

        if (!initialFetched || refreshing) {
            fetchPosts();
        }

        return () => {
            controller?.abort();
            navigation.removeListener("focus", () => fetchPosts());
        };
    }, [controller, refreshing, posts, setPosts, setRefreshing]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, [setRefreshing]);

    return (
        <SafeAreaView style={styles.container}>
            {/** tintColor = iOS, colors = Android */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="white"
                        colors={["white"]}
                    />
                }
            >
                <Text style={styles.title}>Home</Text>
                <PostsFeed {...{ posts, navigation }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
