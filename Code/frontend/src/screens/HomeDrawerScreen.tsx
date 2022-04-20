import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

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
        paddingVertical: 8
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
        backgroundColor: primaryColors.background,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    groupText: {
        fontSize: 18,
        fontWeight: "bold",
        color: primaryColors.background,
        marginVertical: 2
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
                <GroupButton title="NERF Club" />
                <GroupButton title="Design Jobs" />
                <GroupButton title="Squash" />
                <GroupButton title="WEAST Comedy" />
            </View>
        </View>
    </View>
);

export default HomeDrawerScreen;
