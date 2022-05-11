import {
    useState,
    useEffect,
    useContext,
    useCallback,
    Dispatch,
    SetStateAction
} from "react";
import {
    StyleSheet,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearProgress } from "@rneui/themed";

import UserContext from "../../UserContext";
import {
    HomeStackScreenProps,
    Post,
    AggregateUpvotesData,
    UpdateRequestBody
} from "../../types";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import PostCard from "../components/Home/PostCard";

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

const updateUpvotes = async (
    userId: string,
    upvotesData: AggregateUpvotesData
) => {
    try {
        const postsData: UpdateRequestBody = {};
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
                throw new Error(`${response.status}`);
            }
        }
    } catch (err) {
        Alert.alert(`Something went wrong! Error code ${err}`);
    }
};

const fetchPosts = async (
    setFetching: Dispatch<SetStateAction<boolean>> | null,
    setPosts: Dispatch<SetStateAction<Post[]>>,
    setPostUpvotes: Dispatch<SetStateAction<AggregateUpvotesData>>,
    updatedUpvotes: boolean,
    userId: string,
    upvotesData: AggregateUpvotesData
) => {
    try {
        if (!updatedUpvotes) {
            await updateUpvotes(userId, upvotesData);
        }

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
        if (setFetching !== null) {
            setFetching(false);
        }
        setPosts(postsData);
        setPostUpvotes(postUpvotesData);
    } catch (err: any) {
        Alert.alert(`Something went wrong! ${err}`);
    }
};

const HomeScreen = ({ navigation }: HomeStackScreenProps<"Home">) => {
    const colorScheme = useColorScheme();

    const {
        user: { id: userId }
    } = useContext(UserContext);

    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [posts, setPosts] = useState<Post[]>([]);
    const [upvotesData, setPostUpvotes] = useState<AggregateUpvotesData>({});

    useEffect(() => {
        const unsubscribeUpvoteListener = navigation.addListener(
            "blur",
            async () => {
                await updateUpvotes(userId, upvotesData);
                setFetching(true);
            }
        );

        return () => unsubscribeUpvoteListener();
    }, [navigation, upvotesData, userId]);

    useFocusEffect(
        useCallback(() => {
            if (fetching) {
                fetchPosts(
                    setFetching,
                    setPosts,
                    setPostUpvotes,
                    true,
                    userId,
                    upvotesData
                );
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
        setRefreshing(true);
        await fetchPosts(
            null,
            setPosts,
            setPostUpvotes,
            false,
            userId,
            upvotesData
        );
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
            {fetching ? (
                <LinearProgress
                    animation={fetching}
                    color={Colors[colorScheme].tint}
                />
            ) : null}
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
                <Text style={styles.title}>Home</Text>
                {Object.keys(upvotesData).length === posts.length ? (
                    <View style={{ width: "100%" }}>
                        {posts
                            ? posts.map((postData) => (
                                  <PostCard
                                      key={postData.id}
                                      {...{
                                          color: "secondary",
                                          ...postData,
                                          navigation,
                                          toggleUpvote,
                                          postUpvotesData:
                                              upvotesData[postData.id]
                                      }}
                                  />
                              ))
                            : null}
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
