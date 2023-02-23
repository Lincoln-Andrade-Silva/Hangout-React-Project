import { makeAutoObservable, reaction } from "mobx";
import { IServerError } from "../../models/IServerError";

export default class CommonStore {
    error: IServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError = (error: IServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}