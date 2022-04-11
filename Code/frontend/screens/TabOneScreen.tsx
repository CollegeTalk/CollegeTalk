import { StyleSheet } from "react-native";

import { RootTabScreenProps } from "../types";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import CreatePostTitle from "../components/CreatePost/Title";
import TextBox from "../components/CreatePost/TextBox";
import CreatePostButton from "../components/CreatePost/Button";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        fontSize: 36,
        fontWeight: "bold"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%"
    }
});

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => (
    <View style={styles.container}>
        <Text style={styles.title}>Ask a Question:</Text>
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />

        <CreatePostTitle />

        <TextBox />

        <CreatePostButton path="/screens/TabOneScreen.tsx" />
    </View>
);

export default TabOneScreen;
