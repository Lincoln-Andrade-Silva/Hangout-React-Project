import { makeAutoObservable, reaction, runInAction } from "mobx";
import service from "../../api/service";
import { IProfile, IUserPost } from "../../models/IProfile";
import { store } from "../store";

export default class ProfileStore {
    profile: IProfile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    followings: IProfile[] = [];
    loadingFollowings = false;
    activeTab = 0;
    userPosts: IUserPost[] = [];
    loadingPosts = false;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate)
                } else {
                    this.followings = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await service.profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false)
        }
    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await service.profiles.updateFollowing(username);
            store.postStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username
                    && this.profile.username !== username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.username) {
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await service.profiles.listFollowing(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            })
        } catch (error) {
            runInAction(() => this.loadingFollowings = false);
            console.log(error);
        }
    }

    loadUserPosts = async (username: string, predicate?: string) => {
        this.loadingPosts = true;
        try {
            const posts = await service.profiles.listPosts(username, predicate!);
            runInAction(() => {
                this.userPosts = posts;
                this.loadingPosts = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingPosts = false;
            })
        }
    }

}