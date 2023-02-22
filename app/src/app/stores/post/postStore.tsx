import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import service from "../../api/service";
import { IPost } from "../../models/IPost";

export default class PostStore {
    posts = new Map<string, IPost>();
    selectedPost: IPost | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get postsByDate() {
        return Array.from(this.posts.values()).sort((x, y) =>
            Date.parse(x.date) - Date.parse(y.date));
    }

    listPosts = async () => {
        try {
            const posts = await service.post.list();
            runInAction(() => {
                posts.forEach((post: IPost) => {
                    post.date = post.date.split('T')[0];
                    this.posts.set(post.id, post);
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
                this.posts.set(post.id, post);
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
                this.posts.set(post.id, post);
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
                if (this.selectedPost?.id === id) this.cancelSelectedPost();
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    selectPost = (id: string) => {
        this.selectedPost = this.posts.get(id)
    }

    cancelSelectedPost = () => {
        this.selectedPost = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectPost(id) : this.cancelSelectedPost();
        this.setEditMode(true);
    }

    closeForm = () => {
        this.setEditMode(false);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }
}