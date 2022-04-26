import { StyleSheet } from "react-native";
import { Card, Text } from "@rneui/themed";

import { primaryColors } from "../../constants/Colors";

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: primaryColors.text,
        borderRadius: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        alignItems: "center",
        color: "black",
        marginBottom: 0
    },
    body: {
        fontSize: 20,
        color: "black",
        marginTop: 15
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

    return (
        <Card containerStyle={styles.containerStyle}>
            <Card.Title style={styles.title}>{title}</Card.Title>
            <Text style={styles.timestamp}>{timestamp}</Text>
            {body !== "" && <Text style={styles.body}>{body}</Text>}
        </Card>
    );
};

export default PostCard;
