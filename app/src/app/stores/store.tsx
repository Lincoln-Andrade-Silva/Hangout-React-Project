import { createContext, useContext } from "react";
import PostStore from "./post/postStore";

export default interface Store {
    postStore: PostStore
}

export const store: Store = {
    postStore: new PostStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}