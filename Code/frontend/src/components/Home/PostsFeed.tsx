import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import { Post } from "../../../types";
import { primaryColors } from "../../constants/Colors";

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
        <View style= {{ backgroundColor: "white" }}>
            {posts &&
                posts.map((postData) => (
                    <View key={postData.id} >
                    
                        {/* Replace with Post component */}
                        <View style={{ backgroundColor: primaryColors.background, flex:0.1}}/>
                        <Text style={{ color: "green" }}>
                            {postData.time_created}
                        </Text>
                        <Text style={{ color: "green", fontSize: 20, fontWeight: "bold" }}>{postData.title}</Text>
                        <Text style={{ color: "green" }}>{postData.body}</Text>
                      
                    </View>
                    
                ))}
                
        </View>
    );
};

export default PostsFeed;
