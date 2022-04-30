import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Icon } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";
import { PostScreenNavigationProp } from "../../../types";

import { generateTimestamp } from "../Home/PostCard";

const styles = StyleSheet.create({
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleContainer: {
        flex: 5
    },
    iconContainer: {
        flex: 1,
        alignItems: "center"
    },
    body: {
        fontSize: 18,
        color: "black",
        marginTop: 10
    },
    timestamp: {
        fontSize: 14,
        color: "dimgray"
    }
});

type CommentCardProps = {
    showDivider: boolean;
    id: string;
    body: string;
    time_created: Date;
    num_upvotes: number;
    helpful_answer: boolean;
    navigation: PostScreenNavigationProp;
};

const CommentCard = ({
    showDivider,
    id: commentId,
    body,
    time_created: timeCreated,
    num_upvotes: numUpvotes,
    helpful_answer: helpfulAnswer,
    navigation
}: CommentCardProps) => {
    const [hasUpvote, toggleUpvote] = useState(false);
    const [[upvotes, changedUpvote], setNumUpvotes] = useState([
        numUpvotes + (hasUpvote ? 1 : 0),
        false
    ]);

    useEffect(() => {
        const updateUpvotes = async () => {
            if (changedUpvote) {
                try {
                    const response = await fetch(
                        `${process.env.API_URL}/comments/${commentId}`,
                        {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                num_upvotes: upvotes
                            })
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`${response.status}`);
                    }
                } catch (err) {
                    console.error(`Something went wrong! Error code ${err}`);
                }
            }
        };

        const unsubscribeUpvoteListener = navigation.addListener("blur", () =>
            updateUpvotes()
        );

        return () => {
            unsubscribeUpvoteListener();
        };
    }, [changedUpvote, commentId, navigation, upvotes]);

    const toggleUserUpvote = () => {
        toggleUpvote(!hasUpvote);
        setNumUpvotes([hasUpvote ? upvotes - 1 : upvotes + 1, !changedUpvote]);
    };

    const timestamp = generateTimestamp(timeCreated);

    return (
        <Card
            containerStyle={{
                width: "100%",
                backgroundColor: primaryColors.text,
                borderWidth: 0,
                borderBottomWidth: showDivider ? 2 : 0,
                borderBottomColor: "slategray",
                shadowRadius: 0,
                paddingHorizontal: 0,
                paddingVertical: 20,
                marginHorizontal: 0,
                marginTop: 0
            }}
        >
            <View style={styles.headingContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.timestamp}>{timestamp}</Text>
                    <Text style={styles.body}>{body}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon
                        name={hasUpvote ? "thumb-up-alt" : "thumb-up-off-alt"}
                        size={32}
                        type="material"
                        color={hasUpvote ? "green" : "slategray"}
                        onPress={() => toggleUserUpvote()}
                    />
                    <Text
                        style={{
                            color: hasUpvote ? "green" : "slategray",
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 5
                        }}
                    >
                        {upvotes}
                    </Text>
                </View>
            </View>
        </Card>
    );
};

export default CommentCard;
