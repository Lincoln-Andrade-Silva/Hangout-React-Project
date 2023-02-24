import { createContext, useContext } from "react";
import CommonStore from "./common/commonStore";
import PostStore from "./post/postStore";
import UserStore from "./user/userStore";
import ModalStore from "./modal/modalStore"

export default interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store)

export function useStore() { return useContext(StoreContext); }