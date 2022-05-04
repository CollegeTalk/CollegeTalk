import { useState } from "react";
import { TextInput, View } from "react-native";
import { SearchBar } from "@rneui/themed";

import { HomeStackNavigationProp } from "../../../types";

type HeaderTitleProps = {
    isHome: boolean;
    navigation: HomeStackNavigationProp;
};

const HeaderTitle = ({ isHome, navigation }: HeaderTitleProps) => {
    const [searchBar, setSearchBar] = useState<TextInput | null>(null);
    const [searchQuery, updateSearchQuery] = useState("");

    const searchForSubgroups = async (query: string) => {
        const response = await fetch(
            `${process.env.API_URL}/subgroups?query=${query}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        const subgroupsData = await response.json();

        console.log(subgroupsData);
    };

    return isHome ? (
        <View style={{ width: 250 }}>
            <SearchBar
                ref={(search) => {
                    setSearchBar(search);
                }}
                containerStyle={{
                    width: "90%",
                    height: "90%",
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                }}
                inputContainerStyle={{
                    height: "40%",
                    backgroundColor: "lightgray",
                    marginTop: -5
                }}
                inputStyle={{
                    color: "black"
                }}
                placeholder="Search CollegeTalk"
                onChangeText={updateSearchQuery}
                onSubmitEditing={() => searchForSubgroups(searchQuery)}
                onClear={() => searchBar?.blur()}
                value={searchQuery}
                lightTheme
                round
            />
        </View>
    ) : null;
};

export default HeaderTitle;
