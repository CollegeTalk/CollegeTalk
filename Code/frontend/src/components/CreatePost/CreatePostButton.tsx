import * as WebBrowser from "expo-web-browser";
import { Alert, Button, StyleSheet } from "react-native";
import { View } from "../Themed";

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

type CreatePostButtonProps = {
    titleText: string;
    bodyText: string;
    path: string;
};

const CreatePostButton = ({
    titleText,
    bodyText,
    path
}: CreatePostButtonProps) => {
    const submitPostToApi = () => {
        Alert.alert("Post submitted");

        const rand: number = Math.floor(Math.random() * 10) + 5;

        fetch(`https://collegetalk.azurewebsites.net/posts/${rand}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleText,
                body: bodyText
            })
        });
    };
    return (
        <View>
            <Button
                title="Submit"
                color="#0000FF"
                onPress={() => submitPostToApi()}
            />
        </View>
    );
};
export function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
    );
}

export default CreatePostButton;
