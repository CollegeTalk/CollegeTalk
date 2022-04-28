import { View } from "react-native";

import { Post, HomeScreenNavigationProp } from "../../../types";

import PostCard from "./PostCard";

type PostsFeedProps = {
    posts: Post[];
    navigation: HomeScreenNavigationProp;
};

const PostsFeed = ({ posts, navigation }: PostsFeedProps) => (
    <View style={{ width: "100%" }}>
        {posts &&
            posts.map((postData) => (
                <PostCard key={postData.id} {...{ ...postData, navigation }} />
            ))}
    </View>
);

export default PostsFeed;
