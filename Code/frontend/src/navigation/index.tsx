/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { ColorSchemeName } from "react-native";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme
} from "@react-navigation/native";

import LinkingConfiguration from "./LinkingConfiguration";

import HomeDrawerNavigator from "./HomeDrawerNavigator";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
    <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
        <HomeDrawerNavigator />
    </NavigationContainer>
);

export default Navigation;
