import { StyleSheet } from "react-native";
import CreatePostButton from "../components/CreatePost/Button";
import TextBox from "../components/CreatePost/TextBox";
import CreatePostTitle from "../components/CreatePost/Title";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

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
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> 
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
        */}
        <CreatePostTitle />

        <TextBox />

        <CreatePostButton path="/screens/TabOneScreen.tsx" />
    </View>
);

export default TabOneScreen;
