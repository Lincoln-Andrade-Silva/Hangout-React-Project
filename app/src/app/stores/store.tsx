import { createContext, useContext } from "react";
import CommonStore from "./common/commonStore";
import PostStore from "./post/postStore";

export default interface Store {
    postStore: PostStore,
    commonStore: CommonStore;
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore() { return useContext(StoreContext); }