import {
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
    useEffect
} from "react";
import {
    StyleSheet,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView
} from "react-native";

import { Text } from "../components/Themed";
// import { RootTabScreenProps } from "../../types";
import { primaryColors } from "../constants/Colors";
import { Post } from "../../types";

import PostsFeed from "../components/Home/PostsFeed";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: primaryColors.background
    },
    scrollView: {
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

const fetchPosts = async (
    controller: AbortController,
    setPosts: Dispatch<SetStateAction<Post[]>>
) => {
    try {
        const response = await fetch(
            `https://collegetalk.azurewebsites.net/posts`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                signal: controller.signal
            }
        );
        const postsData = await response.json();
        setPosts(postsData);
    } catch (err: any) {
        if (!controller.signal.aborted) {
            Alert.alert(`Something went wrong! ${err}`);
        }
    }
};

// { navigation }: RootTabScreenProps<"Home">
const HomeScreen = () => {
    const controller = new AbortController();

    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState([] as Post[]);

    useEffect(() => {
        fetchPosts(controller, setPosts);
        return () => controller?.abort();
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts(controller, setPosts);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

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
                <PostsFeed {...{ posts }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
