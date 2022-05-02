import { useState, useMemo, useEffect } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import UserContext from "./UserContext";
import { ContextUser } from "./types";

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
                const { id, username, name } = (await response.json())[0];
                setInitialFetched(true);
                setUser({ id, username, name });
            } catch (err: any) {
                Alert.alert(`Something went wrong! ${err}`);
            }
        };

        if (!initialFetched) {
            fetchUsers();
        }
    });

    if (!isLoadingComplete || !initialFetched) {
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
