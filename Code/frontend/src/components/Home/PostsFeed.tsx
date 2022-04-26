import { View } from "react-native";

import { Post } from "../../../types";

import PostCard from "./PostCard";

type PostsFeedProps = {
    posts: Post[];
};

const PostsFeed = ({ posts }: PostsFeedProps) => (
    <View style={{ width: "100%" }}>
        {posts &&
            posts.map((postData) => (
                <PostCard key={postData.id} {...postData} />
            ))}
    </View>
);

export default PostsFeed;
