import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import SubgroupScreen from "../screens/SubgroupScreen";
import SubgroupsScreen from "../screens/SubgroupsScreen";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Post"
            component={PostScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Subgroups"
            component={SubgroupsScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Subgroup"
            component={SubgroupScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export default HomeStack;
