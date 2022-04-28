import { Text } from "react-native";

import { HomeStackScreenProps } from "../../types";

const PostScreen = ({ navigation, route }: HomeStackScreenProps<"Post">) => {
    console.info(route.params);
    return <Text>Hello world</Text>;
};

export default PostScreen;
