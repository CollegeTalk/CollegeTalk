import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Icon, Avatar } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";
import {
    Comment,
    UpvotesData,
    PostAndCommentsUpvotesData
} from "../../../types";

import {
    generateColor,
    generateTimestamp,
    getInitials
} from "../Home/PostCard";

const styles = StyleSheet.create({
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    avatarContainer: {
        flex: 5,
        flexDirection: "row"
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

type CommentCardProps = Comment & {
    showDivider: boolean;
    commentUpvotesData: UpvotesData;
    setUpvotes: Dispatch<SetStateAction<PostAndCommentsUpvotesData>>;
};

const CommentCard = ({
    showDivider,
    commentUpvotesData: { numUpvotes, hasUpvote, changedUpvote },
    id,
    body,
    author_username: authorUsername,
    time_created: timeCreated,
    setUpvotes
}: CommentCardProps) => {
    const [avatarColor] = useState(generateColor());

    const initials = getInitials(authorUsername);
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
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={42}
                        rounded
                        title={initials}
                        containerStyle={{
                            justifyContent: "center",
                            backgroundColor: avatarColor,
                            marginRight: 8
                        }}
                    />
                    <View>
                        <Text style={styles.timestamp}>{timestamp}</Text>
                        <Text style={styles.body}>{body}</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Icon
                        name={hasUpvote ? "thumb-up-alt" : "thumb-up-off-alt"}
                        size={32}
                        type="material"
                        color={hasUpvote ? "green" : "slategray"}
                        onPress={() =>
                            setUpvotes((prevState) => ({
                                ...prevState,
                                comments: {
                                    ...prevState.comments,
                                    [id]: {
                                        numUpvotes:
                                            numUpvotes + (hasUpvote ? -1 : 1),
                                        hasUpvote: !hasUpvote,
                                        changedUpvote: !changedUpvote
                                    }
                                }
                            }))
                        }
                    />
                    <Text
                        style={{
                            color: hasUpvote ? "green" : "slategray",
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 5
                        }}
                    >
                        {numUpvotes}
                    </Text>
                </View>
            </View>
        </Card>
    );
};

export default CommentCard;
