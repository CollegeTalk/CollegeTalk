import { createContext, Dispatch, SetStateAction } from "react";

export default createContext<{
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}>({ user: "", setUser: () => {} });
