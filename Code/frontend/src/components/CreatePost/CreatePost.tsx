import { RefObject, useState, createRef } from "react";
import { TextInput, View, Alert, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import "react-native-get-random-values";
import SelectDropdown from "react-native-select-dropdown";
import { v4 as uuidv4 } from "uuid";

import { primaryColors } from "../../constants/Colors";

import InputField from "./InputField";

const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        marginVertical: 20,
    },
    drownDownContainer:{
        width : "100%",
        justifyContent: "center",
        alignItems: "center"

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
            // TODO: change to real author_id
            const authorId = uuidv4();
            // TODO: change to real subgroup_id
            const subgroupId = "dffefc81-a557-4d9f-abbd-8ad5080b167e";
            const response = await fetch(`${process.env.API_URL}/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    author_id: authorId,
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
        <View style={styles.drownDownContainer}>
            <SelectDropdown
                // get data from database for subgroups, is currently hardcoded 
                data={["Subgroup1", "Subgroup2", "Subgroup3"]}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                defaultButtonText="Choose a Subgroup"
            />
        </View>
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
