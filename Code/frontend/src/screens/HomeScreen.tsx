import { useState, useEffect } from "react";
import {
    StyleSheet,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    View,
    Text
} from "react-native";
import { LinearProgress } from "@rneui/themed";

import { HomeStackScreenProps, Post, UpvotesData } from "../../types";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

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

const HomeScreen = ({ navigation }: HomeStackScreenProps<"Home">) => {
    const colorScheme = useColorScheme();

    const [initialFetched, setInitialFetched] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);

    const [upvotesData, setPostUpvotes] = useState<UpvotesData>({});

    useEffect(() => {
        const controller = new AbortController();

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
                setPosts(postsData);

                const postUpvotesData = Object.assign(
                    {},
                    ...postsData.map(
                        ({ id, num_upvotes: numUpvotes }: Post) => ({
                            [id]: {
                                numUpvotes,
                                hasUpvote: false,
                                changedUpvote: false
                            }
                        })
                    )
                );
                setPostUpvotes(postUpvotesData);

                setInitialFetched(true);
                setRefreshing(false);
            } catch (err: any) {
                if (!controller.signal.aborted) {
                    Alert.alert(`Something went wrong! ${err}`);
                }
            }
        };

        const updateUpvotes = () => {
            try {
                Object.keys(upvotesData).forEach(async (postId) => {
                    const { numUpvotes, changedUpvote } = upvotesData[postId];
                    if (changedUpvote) {
                        const response = await fetch(
                            `${process.env.API_URL}/posts/${postId}`,
                            {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    num_upvotes: numUpvotes
                                })
                            }
                        );

                        if (!response.ok) {
                            throw new Error(`${response.status}`);
                        }
                    }
                });
            } catch (err) {
                console.error(`Something went wrong! Error code ${err}`);
            }
        };

        const unsubscribeRefreshListener = navigation.addListener(
            "focus",
            () => {
                setTimeout(() => setRefreshing(true), 1000);
            }
        );
        const unsubscribeUpvoteListener = navigation.addListener("blur", () =>
            updateUpvotes()
        );

        if (!initialFetched || refreshing) {
            setTimeout(() => fetchPosts(), 1500);
        }

        return () => {
            controller?.abort();
            unsubscribeRefreshListener();
            unsubscribeUpvoteListener();
        };
    }, [
        refreshing,
        posts,
        setPosts,
        setRefreshing,
        navigation,
        initialFetched,
        upvotesData
    ]);

    const toggleUpvote = (id: string, upvoted: boolean) => {
        const { numUpvotes, hasUpvote } = upvotesData[id];
        setPostUpvotes({
            ...upvotesData,
            [id]: {
                numUpvotes: hasUpvote ? numUpvotes - 1 : numUpvotes + 1,
                hasUpvote: upvoted,
                changedUpvote: hasUpvote !== upvoted
            }
        });
    };

    return !initialFetched ? (
        <View
            style={{
                width: "100%",
                flex: 1
            }}
        >
            <LinearProgress
                animation={!initialFetched}
                color={Colors[colorScheme].tint}
            />
        </View>
    ) : (
        <SafeAreaView style={styles.container}>
            {/** tintColor = iOS, colors = Android */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)}
                        tintColor="white"
                        colors={["white"]}
                    />
                }
            >
                <Text style={styles.title}>Home</Text>
                <PostsFeed
                    {...{ posts, navigation, upvotesData, toggleUpvote }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
