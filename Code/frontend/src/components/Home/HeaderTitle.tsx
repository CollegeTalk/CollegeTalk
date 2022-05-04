import { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "@rneui/themed";

type HeaderTitleProps = {
    isHome: boolean;
};

const HeaderTitle = ({ isHome }: HeaderTitleProps) => {
    const [searchQuery, updateSearchQuery] = useState("");

    return isHome ? (
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
    ) : null;
};

export default HeaderTitle;
