import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./BottomTabNavigator";
import HomeDrawerScreen from "../screens/HomeDrawerScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="BottomTab"
        drawerContent={HomeDrawerScreen}
    >
        <Drawer.Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{
                drawerItemStyle: { display: "none" },
                headerShown: false
            }}
        />
    </Drawer.Navigator>
);

export default HomeDrawerNavigator;
