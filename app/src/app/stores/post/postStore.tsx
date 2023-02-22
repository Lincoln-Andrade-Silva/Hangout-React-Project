import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import service from "../../api/service";
import { IPost } from "../../models/IPost";

export default class PostStore {
    posts = new Map<string, IPost>();
    selectedPost: IPost | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get postsByDate() {
        return Array.from(this.posts.values()).sort((x, y) =>
            Date.parse(x.date) - Date.parse(y.date));
    }

    get groupedPosts() {
        return Object.entries(
            this.postsByDate.reduce((posts, post) => {
                const date = post.date;
                posts[date] = posts[date] ? [...posts[date], post] : [post];
                return posts;
            }, {} as { [key: string]: IPost[] })
        )
    }

    listPosts = async () => {
        this.setLoadingInitial(true);
        try {
            const posts = await service.post.list();
            runInAction(() => {
                posts.forEach((post: IPost) => {
                    this.setPost(post);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    createPost = async (post: IPost) => {
        this.setLoading(true);
        post.id = uuid();
        try {
            await service.post.create(post);
            runInAction(() => {
                this.setPost(post);
                this.selectedPost = post;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    editPost = async (post: IPost) => {
        this.setLoading(true);
        try {
            await service.post.edit(post);
            runInAction(() => {
                this.setPost(post);
                this.selectedPost = post;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    deletePost = async (id: string) => {
        this.setLoading(true);
        try {
            await service.post.delete(id);
            runInAction(() => {
                this.posts.delete(id);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    loadPost = async (id: string) => {
        let post = this.posts.get(id);
        if (post) {
            this.selectedPost = post;
            return post;
        }
        else {
            this.setLoadingInitial(true);
            try {
                post = await service.post.details(id);
                this.setPost(post!);
                runInAction(() => this.selectedPost = post)
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    this.setLoadingInitial(false);
                })
            }
        }
    }

    private setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setLoading = (state: boolean) => {
        this.loading = state;
    }

    private setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    private setPost = (post: IPost) => {
        post.date = post.date.split('T')[0];
        this.posts.set(post.id, post);
    }
}