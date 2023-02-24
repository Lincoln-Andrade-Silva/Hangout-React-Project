import { makeAutoObservable, runInAction } from "mobx";
import service from "../../api/service";
import { User, UserFormValues } from "../../models/User";
import { router } from "../../router/Route";
import { store } from "../store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get IsLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await service.account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/dashboard');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await service.account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {
            throw error;
        }
        router.navigate('/dashboard');
        store.modalStore.closeModal();
    }

    getUser = async () => {
        try {
            const user = await service.account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;

    }
}