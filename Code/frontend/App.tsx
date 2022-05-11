import { useState, useMemo, useEffect } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AnimatedSplash from "react-native-animated-splash-screen";
import LottieView from "lottie-react-native";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import UserContext from "./UserContext";
import { ContextUser } from "./types";
import SchoolAnimation from "./src/assets/animations/30304-back-to-school.json";

import Navigation from "./src/navigation";

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [initialFetched, setInitialFetched] = useState(false);

    const [user, setUser] = useState<ContextUser>({
        id: "",
        name: "",
        username: ""
    });
    const userStateContext = useMemo(() => ({ user, setUser }), [user]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/users`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                const results = await response.json();

                setInitialFetched(true);
                if (results?.length) {
                    const { id, username, name } = results[0];
                    setUser({ id, username, name });
                }
            } catch (err: any) {
                Alert.alert(`Something went wrong! ${err}`);
            }
        };

        if (!initialFetched) {
            fetchUsers();
        }
    });

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <AnimatedSplash
            translucent
            isLoaded={initialFetched}
            backgroundColor="#262626"
            logoHeight={250}
            logoWidth={250}
            customComponent={
                <LottieView source={SchoolAnimation} autoPlay loop />
            }
        >
            {initialFetched ? (
                <UserContext.Provider value={userStateContext}>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar />
                    </SafeAreaProvider>
                </UserContext.Provider>
            ) : null}
        </AnimatedSplash>
    );
};

export default App;
