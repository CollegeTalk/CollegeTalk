/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { ColorSchemeName, Pressable } from "react-native";

import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

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
                tabBarActiveTintColor: Colors[colorScheme].tint
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }: RootTabScreenProps<"Home">) => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Modal")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1
                            })}
                        >
                            <Feather
                                name="info"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    )
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
        </BottomTab.Navigator>
    );
};

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
        <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
    </Stack.Navigator>
);

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
    <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
        <RootNavigator />
    </NavigationContainer>
);

export default Navigation;
