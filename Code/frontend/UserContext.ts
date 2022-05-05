import { createContext, Dispatch, SetStateAction } from "react";

import { ContextUser } from "./types";

export default createContext<{
    user: ContextUser;
    setUser: Dispatch<SetStateAction<ContextUser>>;
}>({
    user: {
        id: "",
        name: "",
        username: ""
    },
    setUser: () => null
});
