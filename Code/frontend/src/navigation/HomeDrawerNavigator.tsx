import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./BottomTabNavigator";
import HomeDrawerScreen from "../screens/HomeDrawerScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="Main" drawerContent={HomeDrawerScreen}>
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

export default HomeDrawerNavigator;
