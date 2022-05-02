import { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import { LinearProgress, Icon, CheckBox } from "@rneui/themed";
import LottieView from "lottie-react-native";

// import { BottomTabNavScreenProps } from "../../types";
import { BottomTabNavScreenProps, User } from "../../types";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import JaneAnimation from "../assets/animations/20860-person-on-laptop-working-on-laptop.json";
import UserContext from "../../UserContext";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: primaryColors.background
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: primaryColors.text,
        paddingTop: 20
    },
    animationContainer: {
        width: "80%",
        height: "30%"
    },
    statText: {
        backgroundColor: primaryColors.text,
        fontSize: 20,
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 8
    }
});

const ProfileScreen = ({ navigation }: BottomTabNavScreenProps<"Profile">) => {
    const colorScheme = useColorScheme();

    const {
        user: { id: userId },
        setUser
    } = useContext(UserContext);

    const [initialFetched, setInitialFetched] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [[selectedUser, userIdx], setSelectedUser] = useState([userId, 0]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/users`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    signal: controller.signal
                });
                const usersData = await response.json();

                setInitialFetched(true);
                setUsers(usersData);
            } catch (err: any) {
                if (!controller.signal.aborted) {
                    Alert.alert(`Something went wrong! ${err}`);
                }
            }
        };

        if (!initialFetched) {
            fetchUsers();
        }

        const unsubscribeUserListener = navigation.addListener("focus", () =>
            fetchUsers()
        );

        return () => {
            controller?.abort();
            unsubscribeUserListener();
        };
    });

    const selectUser = (selectedUserId: string, idx: number) => {
        setSelectedUser([selectedUserId, idx]);
        setUser(users[idx]);
    };

    return (
        <View style={styles.container}>
            {!initialFetched && (
                <LinearProgress
                    animation={!initialFetched}
                    color={Colors[colorScheme].tint}
                />
            )}
            <Text style={styles.title}>Profile</Text>
            <View style={styles.animationContainer}>
                <LottieView source={JaneAnimation} autoPlay loop />
            </View>
            <View style={{ marginTop: 10 }}>
                {users.map((userData, idx) => (
                    <TouchableWithoutFeedback
                        key={userData.id}
                        onPress={() => selectUser(userData.id, idx)}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
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
                                            padding: 3,
                                            marginRight: 4
                                        }}
                                    >
                                        <Icon
                                            name="check"
                                            color="white"
                                            size={24}
                                        />
                                    </View>
                                }
                                uncheckedIcon={
                                    <View
                                        style={{
                                            borderRadius: 30,
                                            backgroundColor: "slategray",
                                            padding: 3,
                                            marginRight: 4
                                        }}
                                    >
                                        <Icon
                                            name="circle"
                                            color="slategray"
                                            size={24}
                                        />
                                    </View>
                                }
                                checked={selectedUser === userData.id}
                                onPress={() => selectUser(userData.id, idx)}
                            />
                            <Text style={{ fontSize: 20, color: "white" }}>
                                {userData.username}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    marginTop: 40
                }}
            >
                <Text style={styles.statText}>
                    {users[userIdx]?.subgroups.length} subgroups
                </Text>
                <Text style={styles.statText}>
                    {users[userIdx]?.posts.length} posts
                </Text>
                <Text style={styles.statText}>
                    {users[userIdx]?.comments.length} comments
                </Text>
            </View>
        </View>
    );
};

export default ProfileScreen;
