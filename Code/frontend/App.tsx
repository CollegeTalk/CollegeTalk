import { useState, useMemo, useEffect } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import UserContext from "./UserContext";

import Navigation from "./src/navigation";

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [userId, setUser] = useState("");
    const userStateContext = useMemo(() => ({ userId, setUser }), [userId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/users`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                });
                const usersData = await response.json();
                setUser(usersData[0].id);
            } catch (err: any) {
                Alert.alert(`Something went wrong! ${err}`);
            }
        })();
    });

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <UserContext.Provider value={userStateContext}>
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        </UserContext.Provider>
    );
};

export default App;
