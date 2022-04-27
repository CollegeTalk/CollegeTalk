import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

import { Post, RootStackParamList, RootTabParamList } from "../../../types";

import PostCard from "./PostCard";

type PostsFeedProps = {
    posts: Post[];
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootTabParamList, "Home">,
        NativeStackNavigationProp<RootStackParamList, "HomeDrawer">
    >;
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
