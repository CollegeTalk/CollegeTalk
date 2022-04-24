import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import { Post } from "../../../types";

const PostsFeed = () => {
    const [posts, setPosts] = useState([] as Post[]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                `https://collegetalk.azurewebsites.net/posts`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const postsData = await response.json();
            setPosts(postsData);
        } catch (err: any) {
            Alert.alert(`Something went wrong! ${err}`);
        }
    };

    useEffect(() => {
        fetchPosts();
    });

    return (
        <View>
            {posts &&
                posts.map((postData) => (
                    <View key={postData.id}>
                        {/* Replace with Post component */}
                        <Text style={{ color: "white" }}>
                            {postData.time_created}
                        </Text>
                        <Text style={{ color: "white" }}>{postData.title}</Text>
                        <Text style={{ color: "white" }}>{postData.body}</Text>
                    </View>
                ))}
        </View>
    );
};

export default PostsFeed;
