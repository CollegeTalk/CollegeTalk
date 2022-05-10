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
import { Button, LinearProgress } from "@rneui/themed";

import UserContext from "../../UserContext";
import {
    HomeStackScreenProps,
    Post,
    AggregateUpvotesData,
    UpdateRequestBody,
    Subgroup,
    SubgroupData
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
    headingContainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20
    },
    memberContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    numMembers: {
        fontSize: 20,
        color: "dimgray"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        color: primaryColors.background,
        paddingTop: 15
    },
    description: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "left",
        color: "black",
        paddingTop: 10
    }
});

const updateSubgroup = async (
    userId: string,
    subgroupId: string,
    userSubgroupData: SubgroupData
) => {
    try {
        const subgroupsData: UpdateRequestBody = {};
        const { isMember, changedStatus } = userSubgroupData;
        if (changedStatus) {
            subgroupsData[subgroupId] = {
                function: isMember ? "add" : "remove"
            };
        }

        if (Object.keys(subgroupsData).length) {
            const response = await fetch(`${process.env.API_URL}/subgroups`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    field: "users",
                    objs: subgroupsData
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
        Alert.alert(
            `Something went wrong with updating upvotes! Error code ${err}`
        );
    }
};

const fetchPosts = async (
    setFetching: Dispatch<SetStateAction<boolean>> | null,
    setSubgroupData: Dispatch<SetStateAction<[Subgroup, SubgroupData]>>,
    setPosts: Dispatch<SetStateAction<Post[]>>,
    setPostUpvotes: Dispatch<SetStateAction<AggregateUpvotesData>>,
    updatedUpvotes: boolean,
    userId: string,
    subgroupId: string,
    upvotesData: AggregateUpvotesData
) => {
    try {
        if (!updatedUpvotes) {
            await updateUpvotes(userId, upvotesData);
        }

        const subgroupResponse = await fetch(
            `${process.env.API_URL}/subgroup/${subgroupId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        const subgroupData = await subgroupResponse.json();

        const postsResponse = await fetch(
            `${process.env.API_URL}/posts?subgroup_id=${subgroupId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        if (!postsResponse.ok) {
            throw new Error(`Error code ${postsResponse.status}`);
        }

        const postsData = await postsResponse.json();

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
        setSubgroupData([
            subgroupData,
            {
                isMember: subgroupData.users.includes(userId),
                changedStatus: false
            }
        ]);
        setPosts(postsData);
        setPostUpvotes(postUpvotesData);
    } catch (err: any) {
        Alert.alert(`Something went wrong! ${err}`);
    }
};

const SubgroupScreen = ({
    navigation,
    route: {
        params: { subgroup_id: subgroupId }
    }
}: HomeStackScreenProps<"Subgroup">) => {
    const colorScheme = useColorScheme();

    const {
        user: { id: userId }
    } = useContext(UserContext);

    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [[subgroupData, userSubgroupData], setSubgroupData] = useState<
        [Subgroup, SubgroupData]
    >([
        {
            id: "",
            name: "",
            description: "",
            posts: [],
            users: []
        },
        { isMember: false, changedStatus: false }
    ]);

    const [posts, setPosts] = useState<Post[]>([]);
    const [upvotesData, setPostUpvotes] = useState<AggregateUpvotesData>({});

    useEffect(() => {
        const unsubscribeUpvoteListener = navigation.addListener(
            "blur",
            async () => {
                await updateSubgroup(userId, subgroupId, userSubgroupData);
                await updateUpvotes(userId, upvotesData);
                setFetching(true);
            }
        );

        return () => unsubscribeUpvoteListener();
    }, [navigation, subgroupId, upvotesData, userId, userSubgroupData]);

    useFocusEffect(
        useCallback(() => {
            if (fetching) {
                fetchPosts(
                    setFetching,
                    setSubgroupData,
                    setPosts,
                    setPostUpvotes,
                    true,
                    userId,
                    subgroupId,
                    upvotesData
                );
            }
        }, [fetching, subgroupId, upvotesData, userId])
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
            setSubgroupData,
            setPosts,
            setPostUpvotes,
            false,
            userId,
            subgroupId,
            upvotesData
        );
        setRefreshing(false);
    }, [subgroupId, upvotesData, userId]);

    const { name, description, users: members } = subgroupData;
    const { isMember, changedStatus } = userSubgroupData;
    const numMembers = members.length;

    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: "100%",
                flex: fetching ? 1 : 0,
                backgroundColor: primaryColors.text
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
                {fetching ? (
                    <LinearProgress
                        animation={fetching}
                        color={Colors[colorScheme].tint}
                    />
                ) : null}
                <View style={styles.headingContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.memberContainer}>
                        <Text style={styles.numMembers}>{`${numMembers} member${
                            numMembers === 1 ? "" : "s"
                        }`}</Text>
                        <Button
                            title={isMember ? "Joined" : "Join"}
                            buttonStyle={{
                                backgroundColor: isMember
                                    ? Colors[colorScheme].tint
                                    : "transparent",
                                borderWidth: 3,
                                borderColor: Colors[colorScheme].tint,
                                borderRadius: 30,
                                paddingHorizontal: 20,
                                paddingVertical: 4
                            }}
                            icon={{
                                name: isMember ? "check-circle" : "plus",
                                type: "material-community",
                                size: 22,
                                color: isMember
                                    ? "white"
                                    : Colors[colorScheme].tint
                            }}
                            iconContainerStyle={{
                                marginHorizontal: 0
                            }}
                            titleStyle={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: isMember
                                    ? "white"
                                    : Colors[colorScheme].tint,
                                marginLeft: isMember ? 6 : 2
                            }}
                            onPress={() =>
                                setSubgroupData([
                                    subgroupData,
                                    {
                                        isMember: !isMember,
                                        changedStatus: !changedStatus
                                    }
                                ])
                            }
                            loading={fetching}
                            loadingProps={{
                                color: Colors[colorScheme].tint
                            }}
                        />
                    </View>
                    <Text style={styles.description}>{description}</Text>
                </View>
                {Object.keys(upvotesData).length ||
                Object.keys(upvotesData).length === posts.length ? (
                    <View style={{ width: "100%" }}>
                        {posts
                            ? posts.map((postData) => (
                                  <PostCard
                                      key={postData.id}
                                      {...{
                                          color: "primary",
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

export default SubgroupScreen;
