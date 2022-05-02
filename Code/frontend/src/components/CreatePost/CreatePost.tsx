import { RefObject, useState, useEffect, createRef, useContext } from "react";
import { TextInput, View, Alert, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";
import { CreatePostScreenNavigationProp } from "../../../types";
import UserContext from "../../../UserContext";

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

type CreatePostProps = {
    navigation: CreatePostScreenNavigationProp;
};

const CreatePost = ({ navigation }: CreatePostProps) => {
    const { userId } = useContext(UserContext);

    const titleInput: RefObject<TextInput> = createRef();
    const [showTitleError, toggleTitleError] = useState(false);
    const [title, setTitle] = useState("");

    const bodyInput: RefObject<TextInput> = createRef();
    const [body, setBody] = useState("");

    useEffect(() => {
        const unsubscribeInputListener = navigation.addListener("blur", () =>
            toggleTitleError(false)
        );

        return () => unsubscribeInputListener();
    });

    const submitPost = async () => {
        if (title === "") {
            toggleTitleError(true);
            return;
        }

        try {
            // TODO: change to real subgroup_id
            const subgroupId = "dffefc81-a557-4d9f-abbd-8ad5080b167e";
            const response = await fetch(`${process.env.API_URL}/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    author_id: userId,
                    title,
                    body,
                    subgroup_id: subgroupId
                })
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            Alert.alert("Post submitted");
            titleInput?.current?.clear();
            bodyInput?.current?.clear();
        } catch (err) {
            Alert.alert(`Something went wrong! Error code ${err}`);
        }
    };

    return (
        <View style={styles.postContainer}>
            <InputField
                ref={titleInput}
                showError={showTitleError}
                errorMessage="Please input a valid title"
                placeholder="Your awesome question"
                setText={setTitle}
                toggleError={toggleTitleError}
                isLarge={false}
            />
            <InputField
                ref={bodyInput}
                showError={false}
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
