import { ComponentProps, useState } from "react";
import { View, Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { FAB, SearchBar } from "@rneui/themed";

import { RootTabParamList, RootTabScreenProps } from "../../types";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import HomeScreen from "../screens/HomeScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = ({
    name,
    color
}: {
    name: ComponentProps<typeof Feather>["name"];
    color: string;
}) => (
    <Feather size={35} style={{ marginBottom: -3 }} name={name} color={color} />
);

const BottomTab = createBottomTabNavigator<RootTabParamList>();

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarShowLabel: false,
                tabBarStyle: { height: 75 }
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }: RootTabScreenProps<"Home">) => ({
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() =>
                                navigation.dispatch(
                                    DrawerActions.toggleDrawer()
                                )
                            }
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1
                            })}
                        >
                            <Feather
                                name="menu"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                    headerTitle: () => {
                        const [searchQuery, updateSearchQuery] = useState("");
                        return (
                            <View style={{ width: 250 }}>
                                <SearchBar
                                    containerStyle={{
                                        width: "90%",
                                        height: "90%",
                                        backgroundColor: "transparent",
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0
                                    }}
                                    inputContainerStyle={{
                                        height: "40%",
                                        marginTop: -5
                                    }}
                                    placeholder="Search CollegeTalk"
                                    onChangeText={updateSearchQuery}
                                    value={searchQuery}
                                    lightTheme
                                    round
                                />
                            </View>
                        );
                    }
                })}
            />
            <BottomTab.Screen
                name="CreatePost"
                component={CreatePostScreen}
                options={({
                    navigation
                }: RootTabScreenProps<"CreatePost">) => ({
                    title: "Create Post",
                    tabBarButton: () => (
                        <FAB
                            style={{
                                top: -10
                            }}
                            icon={{ name: "add", color: "white" }}
                            color={Colors[colorScheme].tint}
                            onPress={() => navigation.navigate("CreatePost")}
                        />
                    )
                })}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
