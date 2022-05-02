import { useState, useEffect, useContext, useCallback } from "react";
import {
    StyleSheet,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearProgress } from "@rneui/themed";

import UserContext from "../../UserContext";
import {
    HomeStackScreenProps,
    Post,
    UpvotesData,
    UpvotesRequestBody
} from "../../types";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import PostsFeed from "../components/Home/PostsFeed";

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 30
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.text,
        paddingTop: 15
    }
});

const updateUpvotes = async (userId: string, upvotesData: UpvotesData) => {
    try {
        const postsData: UpvotesRequestBody = {};
        Object.keys(upvotesData).forEach((postId) => {
            const { numUpvotes, hasUpvote, changedUpvote } =
                upvotesData[postId];
            if (changedUpvote) {
                postsData[postId] = {
                    num_upvotes: numUpvotes,
                    function: hasUpvote ? "add" : "remove"
                };
            }
        });
        if (Object.keys(postsData).length !== 0) {
            const response = await fetch(`${process.env.API_URL}/posts`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    field: "users_upvoted",
                    objs: postsData
                })
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
        }
    } catch (err) {
        Alert.alert(`Something went wrong! Error code ${err}`);
    }
};

const HomeScreen = ({ navigation }: HomeStackScreenProps<"Home">) => {
    const colorScheme = useColorScheme();

    const { userId } = useContext(UserContext);

    const [refreshing, setRefreshing] = useState(false);
    const [[updatedUpvotes, fetching], setFetching] = useState([true, true]);

    const [posts, setPosts] = useState<Post[]>([]);

    const [upvotesData, setPostUpvotes] = useState<UpvotesData>({});

    useEffect(() => {
        const unsubscribeUpvoteListener = navigation.addListener(
            "blur",
            async () => {
                await updateUpvotes(userId, upvotesData);
                setFetching([true, true]);
            }
        );

        return () => unsubscribeUpvoteListener();
    }, [navigation, updatedUpvotes, upvotesData, userId]);

    useFocusEffect(
        useCallback(() => {
            const fetchPosts = async () => {
                try {
                    await updateUpvotes(userId, upvotesData);

                    const response = await fetch(
                        `${process.env.API_URL}/posts`,
                        {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            }
                        }
                    );
                    const postsData = await response.json();

                    const postUpvotesData = Object.assign(
                        {},
                        ...postsData.map(
                            ({
                                id,
                                num_upvotes: numUpvotes,
                                users_upvoted: usersUpvoted
                            }: Post) => ({
                                [id]: {
                                    numUpvotes,
                                    hasUpvote: usersUpvoted.includes(userId),
                                    changedUpvote: false
                                }
                            })
                        )
                    );
                    setFetching([true, false]);
                    setPosts(postsData);
                    setPostUpvotes(postUpvotesData);
                } catch (err: any) {
                    Alert.alert(`Something went wrong! ${err}`);
                }
            };

            if (fetching) {
                fetchPosts();
            }
        }, [fetching, upvotesData, userId])
    );

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

    const handleRefresh = useCallback(async () => {
        const fetchPosts = async () => {
            try {
                await updateUpvotes(userId, upvotesData);

                const response = await fetch(`${process.env.API_URL}/posts`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                });
                const postsData = await response.json();

                const postUpvotesData = Object.assign(
                    {},
                    ...postsData.map(
                        ({
                            id,
                            num_upvotes: numUpvotes,
                            users_upvoted: usersUpvoted
                        }: Post) => ({
                            [id]: {
                                numUpvotes,
                                hasUpvote: usersUpvoted.includes(userId),
                                changedUpvote: false
                            }
                        })
                    )
                );
                setPosts(postsData);
                setPostUpvotes(postUpvotesData);
            } catch (err: any) {
                Alert.alert(`Something went wrong! ${err}`);
            }
        };

        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, [upvotesData, userId]);

    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: "100%",
                flex: fetching ? 1 : 0,
                backgroundColor: primaryColors.background
            }}
        >
            {/** tintColor = iOS, colors = Android */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            handleRefresh();
                        }}
                        tintColor="white"
                        colors={["white"]}
                    />
                }
            >
                {fetching && (
                    <LinearProgress
                        animation={fetching}
                        color={Colors[colorScheme].tint}
                    />
                )}
                <Text style={styles.title}>Home</Text>
                {Object.keys(upvotesData).length ? (
                    <PostsFeed
                        {...{ posts, navigation, upvotesData, toggleUpvote }}
                    />
                ) : (
                    <Text />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
