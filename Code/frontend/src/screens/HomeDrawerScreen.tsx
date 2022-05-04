import {
    Dispatch,
    SetStateAction,
    useContext,
    useState,
    useEffect
} from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from "react-native";
import {
    DrawerContentComponentProps,
    getDrawerStatusFromState
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { Text, View } from "../components/Themed";

import { primaryColors } from "../constants/Colors";
import { Subgroup } from "../../types";
import UserContext from "../../UserContext";

const styles = StyleSheet.create({
    container: { height: "100%", overflow: "visible" },
    scrollView: {
        height: "100%",
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    institutionContainer: {
        width: "100%",
        marginVertical: 12
    },
    sectionLabel: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },
    institutionText: {
        overflow: "hidden",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: primaryColors.text,
        backgroundColor: primaryColors.background,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    subgroupsContainer: {
        width: "100%",
        flex: 1,
        marginVertical: 12
    },
    subgroupSubcontainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: primaryColors.background,
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    groupList: {
        backgroundColor: "transparent"
    },
    groupText: {
        fontSize: 14,
        fontWeight: "bold",
        color: primaryColors.background
    }
});

type GroupButtonProps = {
    goToSubgroupPage: (subgroupId: string) => void;
    subgroupData: Subgroup;
};

const SubgroupButton = ({
    goToSubgroupPage,
    subgroupData: { id, name }
}: GroupButtonProps) => (
    <Button
        title={name}
        buttonStyle={{
            backgroundColor: primaryColors.text,
            borderWidth: 3,
            borderColor: primaryColors.text,
            borderRadius: 30
        }}
        containerStyle={{
            marginHorizontal: 5,
            marginBottom: 14
        }}
        titleStyle={styles.groupText}
        onPress={() => goToSubgroupPage(id)}
    />
);

const fetchSubgroups = async (
    setFetching: Dispatch<SetStateAction<boolean>>,
    setSubgroups: Dispatch<SetStateAction<Subgroup[]>>,
    userId: string
) => {
    try {
        setFetching(true);

        const response = await fetch(`${process.env.API_URL}/subgroups`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const subgroupsData = await response.json();

        const userSubgroupsData = subgroupsData.filter(({ users }: Subgroup) =>
            users.includes(userId)
        );

        setSubgroups(userSubgroupsData);
    } catch (err: any) {
        Alert.alert(`Something went wrong with fetching! ${err}`);
    }
};

const HomeDrawerScreen = ({
    navigation,
    state
}: DrawerContentComponentProps) => {
    const {
        user: { id: userId }
    } = useContext(UserContext);

    const [fetching, setFetching] = useState(false);

    const [subgroups, setSubgroups] = useState<Subgroup[]>([]);

    useEffect(() => {
        const isDrawerOpen = getDrawerStatusFromState(state) === "open";
        if (isDrawerOpen && !fetching) {
            fetchSubgroups(setFetching, setSubgroups, userId);
            setFetching(false);
        }
    }, [fetching, navigation, state, userId]);

    const goToSubgroupPage = (subgroupId: string) => {
        navigation.navigate("Subgroup", {
            subgroup_id: subgroupId
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.institutionContainer}>
                    <Text style={styles.sectionLabel}>My Institution</Text>
                    <Text style={styles.institutionText}>William & Mary</Text>
                </View>
                <View style={styles.subgroupsContainer}>
                    <Text style={styles.sectionLabel}>My Subgroups</Text>
                    <View style={styles.subgroupSubcontainer}>
                        {fetching ? (
                            <View
                                style={{
                                    height: "100%",
                                    backgroundColor: "transparent"
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={primaryColors.text}
                                />
                            </View>
                        ) : (
                            <>
                                <View style={styles.groupList}>
                                    {subgroups.map((subgroupData) => (
                                        <SubgroupButton
                                            key={subgroupData.id}
                                            {...{
                                                goToSubgroupPage,
                                                subgroupData
                                            }}
                                        />
                                    ))}
                                </View>
                                <Button
                                    title="Add"
                                    type="outline"
                                    icon={
                                        <FontAwesome5
                                            size={14}
                                            name="plus"
                                            color={primaryColors.text}
                                        />
                                    }
                                    buttonStyle={{
                                        borderWidth: 3,
                                        borderColor: primaryColors.text,
                                        borderRadius: 30
                                    }}
                                    titleStyle={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: primaryColors.text,
                                        marginLeft: 8
                                    }}
                                    onPress={() =>
                                        navigation.navigate("Subgroups")
                                    }
                                />
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeDrawerScreen;
