import { View } from "react-native";

import { HomeScreenNavigationProp, Post, UpvotesData } from "../../../types";

import PostCard from "./PostCard";

type PostsFeedProps = {
    posts: Post[];
    navigation: HomeScreenNavigationProp;
    upvotesData: UpvotesData;
    toggleUpvote: (id: string, upvoted: boolean) => void;
};

const PostsFeed = ({
    posts,
    navigation,
    upvotesData,
    toggleUpvote
}: PostsFeedProps) => (
    <View style={{ width: "100%" }}>
        {posts &&
            posts.map((postData) => (
                <PostCard
                    key={postData.id}
                    {...{
                        ...postData,
                        navigation,
                        toggleUpvote,
                        postUpvotesData: upvotesData[postData.id]
                    }}
                />
            ))}
    </View>
);

export default PostsFeed;
