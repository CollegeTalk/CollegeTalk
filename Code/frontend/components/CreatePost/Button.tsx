import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Button, Alert } from "react-native";

import Colors from "../../constants/Colors";
import { MonoText } from "../StyledText";
import { Text, View } from "../Themed";

const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center"
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        textAlign: "center"
    }
});

const CreatePostButton = ({ path }: { path: string }) => (
    <View>
        <Button
            title="Submit"
            color="#f194ff"
            onPress={() => Alert.alert("Simple Button pressed")}
        />
    </View>
);

export function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
    );
}

export default CreatePostButton;
