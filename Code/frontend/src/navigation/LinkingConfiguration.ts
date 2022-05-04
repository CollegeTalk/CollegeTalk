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
                    BottomTab: {
                        screens: {
                            HomeStack: {
                                screens: {
                                    Home: "home",
                                    Post: "post/:id"
                                }
                            },
                            CreatePost: {
                                screens: {
                                    CreatePost: "create-post"
                                }
                            },
                            Profile: {
                                screens: {
                                    Profile: "profile"
                                }
                            }
                        }
                    }
                }
            },
            NotFound: "*"
        }
    }
};

export default linking;
