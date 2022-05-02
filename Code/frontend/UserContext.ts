import { createContext, Dispatch, SetStateAction } from "react";

export default createContext<{
    userId: string;
    setUser: Dispatch<SetStateAction<string>>;
}>({ userId: "", setUser: () => {} });
