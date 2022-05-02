import { createContext, Dispatch, SetStateAction } from "react";

import { User } from "./types";

export default createContext<{
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}>({
    user: {
        id: "",
        name: "",
        username: "",
        subgroups: [],
        posts: [],
        comments: []
    },
    setUser: () => null
});
