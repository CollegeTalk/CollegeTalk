import { ComponentProps, useState } from "react";
import { View, Text } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { FAB, SearchBar } from "@rneui/themed";

import { BottomTabParamList, BottomTabNavScreenProps } from "../../types";
import Colors, { primaryColors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import HomeStack from "./HomeStack";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HeaderLeft from "../components/Home/HeaderLeft";

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

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarShowLabel: false,
                tabBarStyle: { height: 75 }
            }}
        >
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({
                    navigation,
                    route
                }: BottomTabNavScreenProps<"HomeStack">) => {
                    const routeName = getFocusedRouteNameFromRoute(route);

                    return {
                        title: "",
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="home" color={color} />
                        ),
                        headerStyle: {
                            backgroundColor:
                                routeName === "Home" || routeName === undefined
                                    ? "white"
                                    : primaryColors.background
                        },
                        headerLeft: () => (
                            <HeaderLeft
                                {...{
                                    navigation,
                                    isHome:
                                        routeName === "Home" ||
                                        routeName === undefined,
                                    colorScheme
                                }}
                            />
                        ),
                        headerTitle: () => {
                            const [searchQuery, updateSearchQuery] =
                                useState("");

                            return routeName === "Home" ||
                                routeName === undefined ? (
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
                            ) : (
                                <Text />
                            );
                        }
                    };
                }}
            />
            <BottomTab.Screen
                name="CreatePost"
                component={CreatePostScreen}
                options={({
                    navigation
                }: BottomTabNavScreenProps<"CreatePost">) => ({
                    title: "",
                    tabBarButton: () => (
                        <FAB
                            style={{
                                top: -10
                            }}
                            icon={
                                <Feather name="plus" color="white" size={32} />
                            }
                            buttonStyle={{ padding: 0 }}
                            color={Colors.light.tint}
                            onPress={() => navigation.navigate("CreatePost")}
                        />
                    )
                })}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
