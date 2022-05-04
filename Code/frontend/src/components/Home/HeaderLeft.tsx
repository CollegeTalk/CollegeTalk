import { Text, Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

import { HomeStackNavigationProp } from "../../../types";

type HeaderLeftProps = {
    navigation: HomeStackNavigationProp;
    isHome: boolean;
    colorScheme: "light" | "dark";
};

const HeaderLeft = ({ navigation, isHome, colorScheme }: HeaderLeftProps) =>
    isHome ? (
        <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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
    ) : (
        <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                opacity: pressed ? 0.5 : 1
            })}
        >
            <Feather
                name="chevron-left"
                size={30}
                color="white"
                style={{ marginLeft: 5 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                Back
            </Text>
        </Pressable>
    );

export default HeaderLeft;
