import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Icon } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        backgroundColor: primaryColors.text,
        borderRadius: 20,
        marginVertical: 20
    },
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleContainer: {
        flex: 5
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
        alignItems: "center",
        color: "black",
        marginBottom: 0
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

// TODO: this method is screaming for a refactor :(
const generateTimestamp = (timeCreated: Date) => {
    const dateCreated = new Date(timeCreated);

    let timeDiff = new Date().getTime() - dateCreated.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24);

    let timestampText = `Posted `;
    if (diffDays < 3) {
        // ms -> secs
        timeDiff = Math.round(timeDiff / 1000);
        if (timeDiff < 60) {
            timestampText += `${timeDiff} second${
                timeDiff !== 1 ? "s" : ""
            } ago`;
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

type PostCardProps = {
    title: string;
    body: string;
    time_created: Date;
};

const PostCard = ({
    title,
    body,
    time_created: timeCreated
}: PostCardProps) => {
    const timestamp = generateTimestamp(timeCreated);

    const [hasUpvote, toggleUpvote] = useState(false);
    const [numUpvotes, setNumUpvotes] = useState(0);

    const toggleUserUpvote = () => {
        toggleUpvote(!hasUpvote);
        setNumUpvotes(hasUpvote ? numUpvotes - 1 : numUpvotes + 1);
    };

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.headingContainer}>
                <View style={styles.titleContainer}>
                    <Card.Title style={styles.title}>{title}</Card.Title>
                    <Text style={styles.timestamp}>{timestamp}</Text>
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
                        {numUpvotes}
                    </Text>
                </View>
            </View>
            {body !== "" && <Text style={styles.body}>{body}</Text>}
        </Card>
    );
};

export default PostCard;
