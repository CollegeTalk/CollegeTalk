/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import { createURL } from "expo-linking";

import { RootStackParamList } from "../../types";

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [createURL("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    Home: {
                        screens: {
                            HomeScreen: "home"
                        }
                    },
                    CreatePost: {
                        screens: {
                            CreatePostScreen: "create-post"
                        }
                    },
                    Profile: {
                        screens: {
                            Profile: "profile"
                        }
                    }
                }
            },
            Modal: "modal",
            NotFound: "*"
        }
    }
};

export default linking;
