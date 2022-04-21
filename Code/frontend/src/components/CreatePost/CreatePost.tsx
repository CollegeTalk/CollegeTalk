import { RefObject, useState, createRef } from "react";
import { TextInput, View, Alert, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

import InputField from "./InputField";

const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        marginVertical: 20
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    }
});

const CreatePost = () => {
    const titleInput: RefObject<TextInput> = createRef();
    const [[title, showTitleError], setTitle] = useState(["", false]);
    const bodyInput: RefObject<TextInput> = createRef();
    const [[body], setBody] = useState(["", false]);

    const submitPost = async () => {
        if (title === "") {
            setTitle([title, true]);
            return;
        }

        try {
            await fetch(`https://collegetalk.azurewebsites.net/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    body
                })
            });
            Alert.alert("Post submitted");
            titleInput?.current?.clear();
            bodyInput?.current?.clear();
        } catch (err) {
            Alert.alert(`Something went wrong! ${err}`);
        }
    };

    return (
        <View style={styles.postContainer}>
            <InputField
                ref={titleInput}
                type={showTitleError ? "title" : ""}
                placeholder="Your awesome question"
                setText={setTitle}
                isLarge={false}
            />
            <InputField
                ref={bodyInput}
                placeholder="Optional details here"
                setText={setBody}
                isLarge
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Submit"
                    loading={false}
                    loadingProps={{ size: "small", color: "white" }}
                    buttonStyle={{
                        backgroundColor: primaryColors.text,
                        borderRadius: 5
                    }}
                    titleStyle={{
                        fontWeight: "bold",
                        fontSize: 23,
                        color: primaryColors.background
                    }}
                    containerStyle={{
                        marginHorizontal: 50,
                        height: 50,
                        width: 200,
                        marginVertical: 10
                    }}
                    onPress={() => submitPost()}
                />
            </View>
        </View>
    );
};

export default CreatePost;
