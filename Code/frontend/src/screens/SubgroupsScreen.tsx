import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import {
    StyleSheet,
    View,
    Text,
    Alert,
    RefreshControl,
    SafeAreaView,
    ScrollView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox, Icon, LinearProgress } from "@rneui/themed";

import {
    AggregateSubgroupData,
    HomeStackScreenProps,
    Subgroup,
    UpdateRequestBody
} from "../../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors, { primaryColors } from "../constants/Colors";
import UserContext from "../../UserContext";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: primaryColors.text
    },
    scrollView: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.background,
        paddingTop: 15
    },
    subgroupsContainer: {
        width: "100%",
        marginTop: 16
    },
    subgroupName: {
        fontSize: 24,
        fontWeight: "500"
    },
    subgroupUsers: {
        fontSize: 18,
        fontWeight: "500",
        color: "gray"
    }
});

const updateSubgroups = async (
    userId: string,
    userSubgroupsData: AggregateSubgroupData
) => {
    try {
        const subgroupsData: UpdateRequestBody = {};
        Object.keys(userSubgroupsData).forEach((subgroupId) => {
            const { isMember, changedStatus } = userSubgroupsData[subgroupId];
            if (changedStatus) {
                subgroupsData[subgroupId] = {
                    function: isMember ? "remove" : "add"
                };
            }
        });

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

const fetchSubgroups = async (
    setFetching: Dispatch<SetStateAction<boolean>> | null,
    setSubgroups: Dispatch<SetStateAction<[Subgroup[], AggregateSubgroupData]>>,
    updatedSubgroups: boolean,
    userSubgroupsData: AggregateSubgroupData,
    userId: string
) => {
    try {
        if (!updatedSubgroups) {
            await updateSubgroups(userId, userSubgroupsData);
        }

        const subgroupsResponse = await fetch(
            `${process.env.API_URL}/subgroups`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        const subgroupsData = await subgroupsResponse.json();

        const newUserSubgroupsData: AggregateSubgroupData = Object.assign(
            {},
            ...subgroupsData.map(({ id, users }: Subgroup) => ({
                [id]: {
                    isMember: users.includes(userId),
                    changedStatus: false
                }
            }))
        );

        setSubgroups([subgroupsData, newUserSubgroupsData]);
        if (setFetching !== null) {
            setFetching(false);
        }
    } catch (err: any) {
        Alert.alert(`Something went wrong with fetching! ${err}`);
    }
};

const SubgroupsScreen = ({ navigation }: HomeStackScreenProps<"Subgroups">) => {
    const colorScheme = useColorScheme();

    const {
        user: { id: userId }
    } = useContext(UserContext);

    const [fetching, setFetching] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [[subgroups, userSubgroupsData], setSubgroups] = useState<
        [Subgroup[], AggregateSubgroupData]
    >([[], {}]);

    useEffect(() => {
        const unsubscribeUpvoteListener = navigation.addListener(
            "blur",
            async () => {
                await updateSubgroups(userId, userSubgroupsData);
                setFetching(true);
            }
        );

        return () => unsubscribeUpvoteListener();
    }, [navigation, userId, userSubgroupsData]);

    useFocusEffect(
        useCallback(() => {
            if (fetching) {
                fetchSubgroups(
                    setFetching,
                    setSubgroups,
                    true,
                    userSubgroupsData,
                    userId
                );
            }
        }, [fetching, userId, userSubgroupsData])
    );

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchSubgroups(
            null,
            setSubgroups,
            false,
            userSubgroupsData,
            userId
        );
        setRefreshing(false);
    }, [userId, userSubgroupsData]);

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
                <Text style={styles.title}>Subgroups</Text>
                <View style={styles.subgroupsContainer}>
                    {subgroups.map(({ id, name, users }, idx) => {
                        const { isMember, changedStatus } =
                            userSubgroupsData[id];

                        let newNumMembers = users.length;
                        if (changedStatus) {
                            if (isMember) {
                                newNumMembers -= 1;
                            } else {
                                newNumMembers += 1;
                            }
                        }

                        let isChecked;
                        if (isMember) {
                            isChecked = !changedStatus;
                        } else {
                            isChecked = changedStatus;
                        }

                        return (
                            <View
                                key={id}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderBottomWidth:
                                        idx !== subgroups.length - 1 ? 2 : 0,
                                    borderBottomColor: "slategray",
                                    paddingVertical: 10
                                }}
                            >
                                <CheckBox
                                    center
                                    containerStyle={{
                                        backgroundColor: "transparent",
                                        marginHorizontal: 0,
                                        marginVertical: 10,
                                        padding: 0
                                    }}
                                    checkedIcon={
                                        <View
                                            style={{
                                                borderRadius: 30,
                                                backgroundColor:
                                                    Colors[colorScheme].tint,
                                                padding: 3
                                            }}
                                        >
                                            <Icon
                                                name="check"
                                                color="white"
                                                size={20}
                                            />
                                        </View>
                                    }
                                    uncheckedIcon={
                                        <View
                                            style={{
                                                borderRadius: 30,
                                                backgroundColor: "slategray",
                                                padding: 3
                                            }}
                                        >
                                            <Icon
                                                name="circle"
                                                color="slategray"
                                                size={20}
                                            />
                                        </View>
                                    }
                                    checked={isChecked}
                                    onPress={() => {
                                        setSubgroups([
                                            subgroups,
                                            {
                                                ...userSubgroupsData,
                                                [id]: {
                                                    isMember,
                                                    changedStatus:
                                                        !changedStatus
                                                }
                                            }
                                        ]);
                                    }}
                                />
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={styles.subgroupName}>
                                        {name}
                                    </Text>
                                    <Text style={styles.subgroupUsers}>
                                        {`${newNumMembers} member${
                                            newNumMembers === 1 ? "" : "s"
                                        }`}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SubgroupsScreen;
