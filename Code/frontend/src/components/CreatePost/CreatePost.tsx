import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { TextInput, View, Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors, { primaryColors } from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { CreatePostScreenNavigationProp, Subgroup } from "../../../types";
import UserContext from "../../../UserContext";
import { fetchSubgroups } from "../../screens/HomeDrawerScreen";

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
    const {
        user: { id: userId }
    } = useContext(UserContext);

    const colorScheme = useColorScheme();

    const titleInput = useRef<TextInput>(null);
    const [showTitleError, toggleTitleError] = useState(false);
    const [title, setTitle] = useState("");

    const bodyInput = useRef<TextInput>(null);
    const [body, setBody] = useState("");

    const [fetching, setFetching] = useState(false);

    const [subgroups, setSubgroups] = useState<Subgroup[]>([]);

    const dropdownRef = useRef<SelectDropdown>(null);
    const [isDropdownOpen, toggleDropdownState] = useState(false);
    const [selectedSubgroup, setSelectedSubgroup] = useState("");

    useEffect(() => {
        const unsubscribeInputListener = navigation.addListener("blur", () =>
            toggleTitleError(false)
        );

        return () => unsubscribeInputListener();
    });

    useFocusEffect(
        useCallback(() => {
            fetchSubgroups(setFetching, setSubgroups, userId);
            setSelectedSubgroup("");
            dropdownRef?.current?.reset();
        }, [userId])
    );

    const submitPost = async () => {
        if (title === "") {
            toggleTitleError(true);
            return;
        }

        try {
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
                    subgroup_id: selectedSubgroup
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
            <SelectDropdown
                ref={dropdownRef}
                data={subgroups}
                buttonStyle={{
                    width: "100%",
                    backgroundColor: selectedSubgroup
                        ? Colors[colorScheme].tint
                        : "transparent",
                    borderWidth: 2,
                    borderColor: selectedSubgroup
                        ? Colors[colorScheme].tint
                        : primaryColors.text,
                    borderRadius: 15,
                    marginBottom: 20
                }}
                buttonTextStyle={{
                    textAlign: "left",
                    fontWeight: selectedSubgroup ? "600" : "normal",
                    color: selectedSubgroup ? "white" : "slategray"
                }}
                defaultButtonText="Select a Subgroup"
                renderDropdownIcon={() => (
                    <View
                        style={{
                            backgroundColor: selectedSubgroup
                                ? "white"
                                : Colors[colorScheme].tint,
                            borderRadius: 30
                        }}
                    >
                        <MaterialCommunityIcons
                            name={
                                isDropdownOpen ? "chevron-up" : "chevron-down"
                            }
                            size={30}
                            color={
                                selectedSubgroup
                                    ? Colors[colorScheme].tint
                                    : "white"
                            }
                        />
                    </View>
                )}
                onFocus={() => toggleDropdownState(!isDropdownOpen)}
                onBlur={() => toggleDropdownState(!isDropdownOpen)}
                disabled={fetching}
                onSelect={({ id }: Subgroup) => setSelectedSubgroup(id)}
                buttonTextAfterSelection={({ name }: Subgroup) => name}
                rowTextForSelection={({ name }: Subgroup) => name}
                dropdownStyle={{
                    borderRadius: 10,
                    backgroundColor: primaryColors.text,
                    marginTop: 6
                }}
                rowStyle={{
                    backgroundColor: primaryColors.text,
                    borderBottomColor: "gray"
                }}
                rowTextStyle={{
                    fontWeight: "500"
                }}
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
                    disabledStyle={{ backgroundColor: "gray" }}
                    onPress={() => submitPost()}
                    disabled={selectedSubgroup === ""}
                />
            </View>
        </View>
    );
};

export default CreatePost;
