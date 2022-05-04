import {
    createRef,
    Dispatch,
    RefObject,
    SetStateAction,
    useContext,
    useState
} from "react";
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    TextInput,
    Alert
} from "react-native";
import { Button, Input } from "@rneui/themed";

import Colors, { primaryColors } from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import UserContext from "../../../UserContext";

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: "row"
    },
    inputContainer: {
        borderBottomWidth: 0
    }
});

type CommentInputProps = {
    postId: string;
    setFetching: Dispatch<SetStateAction<boolean>>;
};

const CommentInput = ({ postId, setFetching }: CommentInputProps) => {
    const {
        user: { id: userId }
    } = useContext(UserContext);

    const colorScheme = useColorScheme();

    const commentInput: RefObject<TextInput> = createRef();
    const [comment, setComment] = useState("");

    const postComment = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/comments`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    author_id: userId,
                    body: comment,
                    post_id: postId
                })
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            commentInput?.current?.clear();
            setFetching(true);
        } catch (err) {
            Alert.alert(`Something went wrong! Error code ${err}`);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                backgroundColor: Colors[colorScheme].background,
                borderBottomWidth: 2,
                borderBottomColor: "lightgray"
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.commentContainer}>
                    <Input
                        ref={commentInput}
                        containerStyle={{ flex: 1 }}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={{
                            color: "black",
                            borderRadius: 15,
                            borderColor: primaryColors.text,
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginTop: 15,
                            marginBottom: 25
                        }}
                        placeholder="Add a comment"
                        shake={() => true}
                        renderErrorMessage={false}
                        onChangeText={(value) => setComment(value)}
                        multiline
                    />
                    <Button
                        containerStyle={{ marginTop: 15, marginRight: 12 }}
                        buttonStyle={{ borderRadius: 8 }}
                        title="Reply"
                        titleStyle={{ fontSize: 18 }}
                        disabled={comment === ""}
                        onPress={() => postComment()}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CommentInput;
