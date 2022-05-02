/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {
    CompositeScreenProps,
    CompositeNavigationProp,
    NavigatorScreenParams
} from "@react-navigation/native";
import {
    DrawerScreenProps,
    DrawerNavigationProp
} from "@react-navigation/drawer";
import {
    BottomTabScreenProps,
    BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * ParamList types
 */
export type HomeStackParamList = {
    Home: undefined;
    Post: { post_id: "string" };
};

export type BottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    CreatePost: undefined;
    Profile: undefined;
};

export type HomeDrawerParamList = {
    BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

export type RootStackParamList = {
    Root: NavigatorScreenParams<HomeDrawerParamList>;
    NotFound: undefined;
};

/**
 * ScreenProps types
 */
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type BottomTabNavScreenProps<Screen extends keyof BottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabParamList, Screen>,
        DrawerScreenProps<HomeDrawerParamList>
    >;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
    CompositeScreenProps<
        StackScreenProps<HomeStackParamList, Screen>,
        CompositeScreenProps<
            BottomTabScreenProps<BottomTabParamList>,
            DrawerScreenProps<HomeDrawerParamList>
        >
    >;

export type HomeStackNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, "HomeStack">,
    StackNavigationProp<HomeStackParamList>
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "Home">,
    CompositeNavigationProp<
        BottomTabNavigationProp<BottomTabParamList>,
        DrawerNavigationProp<HomeDrawerParamList>
    >
>;

export type PostScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "Post">,
    CompositeNavigationProp<
        BottomTabNavigationProp<BottomTabParamList>,
        DrawerNavigationProp<HomeDrawerParamList>
    >
>;

export type CreatePostScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, "CreatePost">,
    DrawerNavigationProp<HomeDrawerParamList>
>;

/**
 * Database and data structure types
 */
export type User = {
    id: string;
    name: string;
    username: string;
    subgroups: string[];
    posts: string[];
    comments: string[];
};

export type Post = {
    id: string;
    time_created: Date;
    author_id: string;
    title: string;
    body: string;
    num_upvotes: number;
    users_upvoted: string[];
    subgroup_id: string;
};

export type PostUpvotesData = {
    numUpvotes: number;
    hasUpvote: boolean;
    changedUpvote: boolean;
};

export type UpvotesData = {
    [id: string]: PostUpvotesData;
};

export type UpvotesRequestBody = {
    [id: string]: {
        num_upvotes: number;
        function: string;
    };
};

export type Comment = {
    id: string;
    time_created: Date;
    author_id: string;
    body: string;
    num_upvotes: number;
    users_upvoted: string[];
    helpful_answer: boolean;
};
