import { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
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
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const submitPostToApi = () => {
        const rand: number = Math.floor(Math.random() * 10) + 5;

        fetch(`https://collegetalk.azurewebsites.net/posts/${rand}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body
            })
        })
            .then(() => {
                Alert.alert("Post submitted");
            })
            .catch((err) => {
                Alert.alert(`Something went wrong! ${err.body.message}`);
            });
    };

    return (
        <View style={styles.postContainer}>
            <InputField
                placeholder="Your awesome question"
                text={title}
                setText={setTitle}
                isLarge={false}
            />
            <InputField
                placeholder="Optional details here"
                text={body}
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
                    onPress={() => submitPostToApi()}
                />
            </View>
        </View>
    );
};

export default CreatePost;
