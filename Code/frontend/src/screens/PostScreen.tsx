import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext
} from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    View,
    Text
} from "react-native";
import { Avatar, Icon, LinearProgress } from "@rneui/themed";

import { useFocusEffect } from "@react-navigation/native";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
    HomeStackScreenProps,
    Post,
    Comment,
    UpdateRequestBody,
    PostAndCommentsUpvotesData
} from "../../types";
import UserContext from "../../UserContext";

import {
    generateColor,
    generateTimestamp,
    getInitials
} from "../components/Home/PostCard";
import CommentInput from "../components/Post/CommentInput";
import CommentCard from "../components/Post/CommentCard";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: primaryColors.text
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20
    },
    avatarContainer: {
        flex: 5,
        flexDirection: "row"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "left",
        alignItems: "center",
        color: "black",
        marginTop: 6,
        marginBottom: 4
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

const updateUpvotes = async (
    userId: string,
    postId: string,
    {
        post: postUpvotesData,
        comments: commentsUpvotesData
    }: PostAndCommentsUpvotesData
) => {
    try {
        const postsData: UpdateRequestBody = {};
        let { numUpvotes, hasUpvote, changedUpvote } = postUpvotesData;
        if (changedUpvote) {
            postsData[postId] = {
                num_upvotes: numUpvotes,
                function: hasUpvote ? "add" : "remove"
            };
        }
        if (Object.keys(postsData).length) {
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
                throw new Error(`${response.status} for post`);
            }
        }

        const commentsData: UpdateRequestBody = {};
        Object.keys(commentsUpvotesData).forEach((commentId) => {
            ({ numUpvotes, hasUpvote, changedUpvote } =
                commentsUpvotesData[commentId]);
            if (changedUpvote) {
                commentsData[commentId] = {
                    num_upvotes: numUpvotes,
                    function: hasUpvote ? "add" : "remove"
                };
            }
        });
        if (Object.keys(commentsData).length) {
            const response = await fetch(`${process.env.API_URL}/comments`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    field: "users_upvoted",
                    objs: commentsData
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
        }
    } catch (err) {
        Alert.alert(
            `Something went wrong with updating upvotes! Error code ${err}`
        );
    }
};

const fetchPostAndComments = async (
    setFetching: Dispatch<SetStateAction<boolean>> | null,
    setPostAndComments: Dispatch<SetStateAction<[Post, Comment[]]>>,
    setUpvotes: Dispatch<SetStateAction<PostAndCommentsUpvotesData>>,
    updatedUpvotes: boolean,
    userId: string,
    postId: string,
    upvotesData: PostAndCommentsUpvotesData
) => {
    try {
        if (!updatedUpvotes) {
            await updateUpvotes(userId, postId, upvotesData);
        }

        const postResponse = await fetch(
            `${process.env.API_URL}/posts/${postId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        const postData = await postResponse.json();

        const newPostUpvotesData = {
            numUpvotes: postData.num_upvotes,
            hasUpvote: postData.users_upvoted.includes(userId),
            changedUpvote: false
        };

        const commentsReponse = await fetch(
            `${process.env.API_URL}/comments?post_id=${postId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        if (!commentsReponse.ok) {
            throw new Error(`Error code ${commentsReponse.status}`);
        }

        const commentsData = await commentsReponse.json();

        const newCommentsUpvotesData = Object.assign(
            {},
            ...commentsData.map(
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

        setPostAndComments([postData, commentsData]);
        setUpvotes({
            post: newPostUpvotesData,
            comments: newCommentsUpvotesData
        });
        if (setFetching !== null) {
            setFetching(false);
        }
    } catch (err: any) {
        Alert.alert(`Something went wrong with fetching! ${err}`);
    }
};

const PostScreen = ({
    navigation,
    route: {
        params: { post_id: postId }
    }
}: HomeStackScreenProps<"Post">) => {
    const colorScheme = useColorScheme();

    const {
        user: { id: userId }
    } = useContext(UserContext);

    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [[post, comments], setPostAndComments] = useState<[Post, Comment[]]>([
        {
            id: "",
            time_created: new Date(),
            author_id: "",
            author_username: "",
            title: "",
            body: "",
            num_upvotes: 0,
            users_upvoted: [],
            subgroup_id: ""
        },
        []
    ]);
    const [upvotesData, setUpvotes] = useState<PostAndCommentsUpvotesData>({
        post: {
            numUpvotes: -1,
            hasUpvote: false,
            changedUpvote: false
        },
        comments: {}
    });

    useEffect(() => {
        const unsubscribeUpvoteListener = navigation.addListener(
            "blur",
            async () => {
                await updateUpvotes(userId, postId, upvotesData);
                setFetching(true);
            }
        );

        return () => unsubscribeUpvoteListener();
    }, [navigation, postId, upvotesData, userId]);

    useFocusEffect(
        useCallback(() => {
            if (fetching) {
                fetchPostAndComments(
                    setFetching,
                    setPostAndComments,
                    setUpvotes,
                    true,
                    userId,
                    postId,
                    upvotesData
                );
            }
        }, [fetching, postId, upvotesData, userId])
    );

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPostAndComments(
            null,
            setPostAndComments,
            setUpvotes,
            false,
            userId,
            postId,
            upvotesData
        );
        setRefreshing(false);
    }, [postId, upvotesData, userId]);

    const {
        title,
        body,
        author_username: authorUsername,
        time_created: timeCreated
    } = post;
    const { numUpvotes, hasUpvote, changedUpvote } = upvotesData.post;

    const initials = getInitials(authorUsername);
    const [avatarColor] = useState(generateColor());

    const timestamp: string = generateTimestamp(timeCreated);

    return (
        <SafeAreaView style={styles.container}>
            {/** tintColor = iOS, colors = Android */}
            {fetching ? (
                <LinearProgress
                    animation={fetching}
                    color={Colors[colorScheme].tint}
                />
            ) : null}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => handleRefresh()}
                        tintColor="black"
                        colors={["black"]}
                    />
                }
            >
                <View style={styles.headingContainer}>
                    <View style={styles.avatarContainer}>
                        {initials ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Avatar
                                    size={32}
                                    rounded
                                    title={initials}
                                    containerStyle={{
                                        justifyContent: "center",
                                        backgroundColor: avatarColor,
                                        marginRight: 8
                                    }}
                                />
                                <Text
                                    style={{ fontSize: 18, fontWeight: "500" }}
                                >
                                    {authorUsername}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    {numUpvotes !== -1 ? (
                        <View style={styles.iconContainer}>
                            <Icon
                                name={
                                    hasUpvote
                                        ? "thumb-up-alt"
                                        : "thumb-up-off-alt"
                                }
                                size={32}
                                type="material"
                                color={hasUpvote ? "green" : "slategray"}
                                onPress={() =>
                                    setUpvotes({
                                        ...upvotesData,
                                        post: {
                                            numUpvotes: hasUpvote
                                                ? numUpvotes - 1
                                                : numUpvotes + 1,
                                            hasUpvote: !hasUpvote,
                                            changedUpvote: !changedUpvote
                                        }
                                    })
                                }
                            />
                            <Text
                                style={{
                                    color: hasUpvote ? "green" : "slategray",
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}
                            >
                                {numUpvotes}
                            </Text>
                        </View>
                    ) : null}
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
                {body ? (
                    <Text style={styles.body}>{body.replace(/â€™/g, "'")}</Text>
                ) : null}
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>
                        {comments.length} comments
                    </Text>
                    {comments.length ===
                    Object.keys(upvotesData.comments).length
                        ? comments.map((commentData, idx) => (
                              <CommentCard
                                  key={commentData.id}
                                  {...{
                                      ...commentData,
                                      commentUpvotesData:
                                          upvotesData.comments[commentData.id],
                                      setUpvotes
                                  }}
                                  showDivider={idx !== comments.length - 1}
                              />
                          ))
                        : null}
                </View>
            </ScrollView>
            <CommentInput {...{ postId, setFetching }} />
        </SafeAreaView>
    );
};

export default PostScreen;
