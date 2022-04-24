import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import { Feather } from "@expo/vector-icons";
import { primaryColors } from "../constants/Colors";

import { Text, View } from "../components/Themed";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        marginVertical: 44
    },
    institutionContainer: {
        width: "100%",
        paddingHorizontal: 10,
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
    groupsContainer: {
        width: "100%",
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 12
    },
    groupSubcontainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: primaryColors.background,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    groupList: {
        backgroundColor: "transparent"
    },
    groupText: {
        fontSize: 18,
        fontWeight: "bold",
        color: primaryColors.background
    }
});

type GroupButtonProps = {
    title: string;
};

const GroupButton = ({ title }: GroupButtonProps) => (
    <Button
        title={title}
        buttonStyle={{
            backgroundColor: primaryColors.text,
            borderRadius: 30
        }}
        containerStyle={{
            marginHorizontal: 5,
            marginVertical: 10
        }}
        titleStyle={styles.groupText}
    />
);

const HomeDrawerScreen = () => (
    <View style={styles.container}>
        <View style={styles.institutionContainer}>
            <Text style={styles.sectionLabel}>My Institution</Text>
            <Text style={styles.institutionText}>William & Mary</Text>
        </View>
        <View style={styles.groupsContainer}>
            <Text style={styles.sectionLabel}>My Groups</Text>
            <View style={styles.groupSubcontainer}>
                <View style={styles.groupList}>
                    <GroupButton title="NERF Club" />
                    <GroupButton title="Design Jobs" />
                    <GroupButton title="Squash" />
                    <GroupButton title="WEAST Comedy" />
                </View>
                <Button
                    title="Add"
                    type="outline"
                    icon={
                        <Feather
                            size={20}
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
                        fontSize: 20,
                        fontWeight: "bold",
                        color: primaryColors.text,
                        marginLeft: 5
                    }}
                />
            </View>
        </View>
    </View>
);

export default HomeDrawerScreen;
