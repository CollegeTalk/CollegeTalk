/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { ComponentProps, useState } from "react";
import { ColorSchemeName, View, Pressable } from "react-native";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
    DrawerActions
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";

import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

// import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
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
    <Feather size={30} style={{ marginBottom: -3 }} name={name} color={color} />
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
                tabBarShowLabel: false
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
                                        height: "90%"
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
                options={{
                    title: "Create Post",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="plus" color={color} />
                    )
                }}
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

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{
            swipeEnabled: false
        }}
    >
        <Drawer.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{
                drawerItemStyle: { display: "none" },
                headerShown: false
            }}
        />
    </Drawer.Navigator>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
        />
        {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group> */}
    </Stack.Navigator>
);

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
    <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
        {/* <RootNavigator /> */}
        <HomeDrawerNavigator />
    </NavigationContainer>
);

export default Navigation;
