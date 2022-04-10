import {KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import CreatePostButton from "../components/CreatePostButton";
import CreatePostTitle from "../components/CreatePostTitle";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import TextBox from "../components/TextBox";


export default function TabOneScreen({
    navigation
}: RootTabScreenProps<"TabOne">) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ask a Question:</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" /><View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            
            <CreatePostTitle />

            <TextBox />

            <CreatePostButton path="/screens/TabOneScreen.tsx" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-evenly'
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
