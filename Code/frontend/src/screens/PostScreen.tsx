import { useState, useEffect } from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    View,
    Text
} from "react-native";
import { Icon, LinearProgress } from "@rneui/themed";

import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { HomeStackScreenProps, Post, Comment } from "../../types";

import { generateTimestamp } from "../components/Home/PostCard";
import CommentInput from "../components/Post/CommentInput";
import CommentCard from "../components/Post/CommentCard";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: primaryColors.text
    },
    scrollView: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 30
    },
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleContainer: {
        flex: 5
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        alignItems: "center",
        color: "black",
        marginBottom: 0
    },
    iconContainer: {
        flex: 1,
        alignItems: "center"
    },
    body: {
        fontSize: 20,
        color: "black",
        marginTop: 16
    },
    timestamp: {
        fontSize: 16,
        color: "dimgray"
    },
    commentsContainer: {
        width: "100%",
        marginTop: 40
    },
    commentsHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4
    }
});

const PostScreen = ({
    navigation,
    route: {
        params: { post_id: postId }
    }
}: HomeStackScreenProps<"Post">) => {
    const colorScheme = useColorScheme();

    const [initialFetched, setInitialFetched] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [[post, comments], setPostAndComments] = useState<
        [Post | null, Comment[]]
    >([null, []]);

    const [hasUpvote, toggleUpvote] = useState(false);
    const [[upvotes, changedUpvote], setNumUpvotes] = useState([0, false]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPostAndComments = async () => {
            try {
                const postResponse = await fetch(
                    `${process.env.API_URL}/posts/${postId}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        signal: controller.signal
                    }
                );
                const postData = await postResponse.json();

                const commentsReponse = await fetch(
                    `${process.env.API_URL}/comments?post_id=${postId}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        signal: controller.signal
                    }
                );
                const commentsData = await commentsReponse.json();

                setPostAndComments([postData, commentsData]);
                setNumUpvotes([
                    postData.num_upvotes + (hasUpvote ? 1 : 0),
                    false
                ]);

                setInitialFetched(true);
                setRefreshing(false);
            } catch (err: any) {
                if (!controller.signal.aborted) {
                    Alert.alert(`Something went wrong! ${err}`);
                }
            }
        };

        if (!initialFetched || refreshing) {
            setTimeout(() => fetchPostAndComments(), 1500);
        }
    }, [hasUpvote, initialFetched, postId, refreshing]);

    useEffect(() => {
        const updateUpvotes = async () => {
            if (changedUpvote) {
                try {
                    const response = await fetch(
                        `${process.env.API_URL}/posts/${postId}`,
                        {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                num_upvotes: upvotes
                            })
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`${response.status}`);
                    }
                } catch (err) {
                    console.error(`Something went wrong! Error code ${err}`);
                }
            }
        };

        const unsubscribeUpvoteListener = navigation.addListener("blur", () =>
            updateUpvotes()
        );

        return () => {
            unsubscribeUpvoteListener();
        };
    }, [changedUpvote, navigation, postId, upvotes]);

    const toggleUserUpvote = () => {
        toggleUpvote(!hasUpvote);
        setNumUpvotes([hasUpvote ? upvotes - 1 : upvotes + 1, !changedUpvote]);
    };

    const timestamp: string = post ? generateTimestamp(post.time_created) : "";

    return (
        <SafeAreaView style={styles.container}>
            {/** tintColor = iOS, colors = Android */}
            {!initialFetched ? (
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
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => setRefreshing(true)}
                            tintColor="black"
                            colors={["black"]}
                        />
                    }
                >
                    <View style={styles.headingContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{post?.title}</Text>
                            <Text style={styles.timestamp}>{timestamp}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon
                                name={
                                    hasUpvote
                                        ? "thumb-up-alt"
                                        : "thumb-up-off-alt"
                                }
                                size={36}
                                type="material"
                                color={hasUpvote ? "green" : "slategray"}
                                onPress={() => toggleUserUpvote()}
                            />
                            <Text
                                style={{
                                    color: hasUpvote ? "green" : "slategray",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginLeft: 5
                                }}
                            >
                                {upvotes}
                            </Text>
                        </View>
                    </View>
                    {post?.body !== "" && (
                        <Text style={styles.body}>{post?.body}</Text>
                    )}
                    <View style={styles.commentsContainer}>
                        <Text style={styles.commentsHeader}>
                            {comments.length} comments
                        </Text>
                        {comments.map((commentData, idx) => (
                            <CommentCard
                                key={commentData.id}
                                {...{ ...commentData, navigation }}
                                showDivider={idx !== comments.length - 1}
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
            <CommentInput {...{ postId, setRefreshing }} />
        </SafeAreaView>
    );
};

export default PostScreen;
