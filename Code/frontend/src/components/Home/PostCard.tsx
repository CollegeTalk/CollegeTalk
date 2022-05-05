import { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Card, Avatar, Text, Icon } from "@rneui/themed";
import "react-native-gesture-handler";

import { HomeScreenNavigationProp, Post, UpvotesData } from "../../../types";
import { primaryColors } from "../../constants/Colors";

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
    }
});

export const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    return `#${randomColor}`;
};

// TODO: this method is screaming for a refactor :(
export const generateTimestamp = (timeCreated: Date) => {
    const dateCreated = new Date(timeCreated);

    let timeDiff = new Date().getTime() - dateCreated.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24);

    let timestampText = `Posted `;
    if (diffDays < 3) {
        // ms -> secs
        timeDiff = Math.round(timeDiff / 1000);
        if (timeDiff < 60) {
            if (timeDiff < 10) {
                timestampText += "just now";
            } else {
                timestampText += `${timeDiff} second${
                    timeDiff !== 1 ? "s" : ""
                } ago`;
            }
        } else {
            // secs -> mins
            timeDiff = Math.round(timeDiff / 60);
            if (timeDiff < 60) {
                timestampText += `${timeDiff} minute${
                    timeDiff !== 1 ? "s" : ""
                } ago`;
            } else {
                // mins -> hrs
                timeDiff = Math.round(timeDiff / 60);
                if (timeDiff < 24) {
                    timestampText += `${timeDiff} hour${
                        timeDiff !== 1 ? "s" : ""
                    } ago`;
                } else {
                    // hrs -> days
                    timeDiff = Math.round(timeDiff / 24);
                    timestampText += `${timeDiff} day${
                        timeDiff !== 1 ? "s" : ""
                    } ago`;
                }
            }
        }
    } else {
        const month = (dateCreated.getMonth() + 1).toString().padStart(2, "0");
        const day = dateCreated.getDate();
        const year = dateCreated.getFullYear();
        timestampText += `on ${month}/${day}/${year}`;
    }

    return timestampText;
};

export const getInitials = (authorUsername: string) =>
    authorUsername.replace(/[a-z0-9]/g, "");

type PostCardProps = Post & {
    color: "primary" | "secondary";
    postUpvotesData: UpvotesData;
    navigation: HomeScreenNavigationProp;
    toggleUpvote: (id: string, upvoted: boolean) => void;
};

const PostCard = ({
    color,
    id,
    author_username: authorUsername,
    title,
    body,
    time_created: timeCreated,
    postUpvotesData: { numUpvotes, hasUpvote },
    navigation,
    toggleUpvote
}: PostCardProps) => {
    const initials = getInitials(authorUsername);
    const [avatarColor] = useState(generateColor());

    const timestamp = generateTimestamp(timeCreated);

    const upvoteIconColors = {
        primary: (active: boolean) => (active ? "white" : primaryColors.text),
        secondary: (active: boolean) => (active ? "green" : "slategray")
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Post", { post_id: id })}
        >
            <Card
                containerStyle={{
                    flexShrink: 1,
                    backgroundColor:
                        color === "primary"
                            ? primaryColors.background
                            : primaryColors.text,
                    borderRadius: 20,
                    marginVertical: 20
                }}
            >
                <View style={styles.headingContainer}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size={36}
                            rounded
                            title={initials}
                            containerStyle={{
                                justifyContent: "center",
                                backgroundColor: avatarColor,
                                marginRight: 8
                            }}
                        />
                        <View>
                            <Card.Title
                                style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    alignItems: "center",
                                    color:
                                        color === "primary" ? "white" : "black",
                                    marginBottom: 0
                                }}
                            >
                                {title}
                            </Card.Title>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color:
                                        color === "primary"
                                            ? "lightgray"
                                            : "dimgray"
                                }}
                            >
                                {timestamp}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={
                                hasUpvote ? "thumb-up-alt" : "thumb-up-off-alt"
                            }
                            size={32}
                            type="material"
                            color={upvoteIconColors[color](hasUpvote)}
                            onPress={() => toggleUpvote(id, !hasUpvote)}
                        />
                        <Text
                            style={{
                                color: upvoteIconColors[color](hasUpvote),
                                fontSize: 18,
                                fontWeight: "bold",
                                marginLeft: 5
                            }}
                        >
                            {numUpvotes}
                        </Text>
                    </View>
                </View>
                {body !== "" ? (
                    <Text
                        style={{
                            fontSize: 18,
                            color: color === "primary" ? "white" : "black",
                            marginTop: 10
                        }}
                    >
                        {body}
                    </Text>
                ) : null}
            </Card>
        </TouchableWithoutFeedback>
    );
};

export default PostCard;
