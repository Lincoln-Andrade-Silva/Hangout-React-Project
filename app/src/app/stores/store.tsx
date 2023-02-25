import { createContext, useContext } from "react";
import CommonStore from "./common/commonStore";
import PostStore from "./post/postStore";
import UserStore from "./user/userStore";
import ModalStore from "./modal/modalStore"
import ProfileStore from "./profile/profileStore";

export default interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store)

export function useStore() { return useContext(StoreContext); }