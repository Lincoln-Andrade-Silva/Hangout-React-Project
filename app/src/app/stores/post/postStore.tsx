import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import service from "../../api/service";
import { IPagination, IPagingParams } from "../../models/IPaginationModels";
import { IPost, PostFormValues } from "../../models/IPost";
import { IProfile } from "../../models/IProfile";
import { store } from "../store";

export default class PostStore {
    posts = new Map<string, IPost>();
    selectedPost: IPost | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: IPagination | null = null;
    pagingParams = new IPagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new IPagingParams();
                this.posts.clear();
                this.listPosts();
            }
        )
    }

    setIPagingParams = (pagingParams: IPagingParams) => {
        this.pagingParams = pagingParams;
    }

    setIPagination = (pagination: IPagination) => {
        this.pagination = pagination;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((_value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true)
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true)
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
                break;
            case 'Search':
                resetPredicate();
                this.predicate.set('Search', value)
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
                console.log(key, value)
            }
        })
        return params;
    }

    get postsByDate() {
        return Array.from(this.posts.values()).sort((x, y) =>
            x.date.getTime() - y.date.getTime());
    }

    get groupedPosts() {
        return Object.entries(
            this.postsByDate.reduce((posts, post) => {
                const date = format(post.date, ' dd MMM, yyyy');
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
            this.setLoadingInitial(false);
        }
    }

    createPost = async (post: PostFormValues) => {
        const user = store.userStore.user;
        const attendee = new IProfile(user!);
        try {
            await service.post.create(post);
            const newPost = new IPost(post);
            newPost.hostUsername = user!.username;
            newPost.attendees = [attendee];
            this.setPost(newPost);
            runInAction(() => {
                this.selectedPost = new IPost();
            })
        } catch (error) {
            console.log(error);
        }
    }

    editPost = async (post: PostFormValues) => {
        try {
            await service.post.edit(post);
            runInAction(() => {
                if (post.id) {
                    let updatedPost = { ...this.posts.get(post.id), ...post }
                    this.posts.set(post.id, updatedPost as IPost);
                    this.setPost(updatedPost as IPost)
                }
            })
        } catch (error) {
            console.log(error);
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

    updateAttendence = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await service.post.attend(this.selectedPost!.id);
            runInAction(() => {
                if (this.selectedPost?.isGoing) {
                    this.selectedPost.attendees =
                        this.selectedPost.attendees?.filter(a => a.username !== user?.username);
                    this.selectedPost.isGoing = false;
                } else {
                    const attendee = new IProfile(user!);
                    this.selectedPost?.attendees?.push(attendee);
                    this.selectedPost!.isGoing = true;
                }
                this.posts.set(this.selectedPost!.id, this.selectedPost!)
            })

        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelPostToggle = async () => {
        this.loading = true
        try {
            await service.post.attend(this.selectedPost!.id);
            runInAction(() => {
                this.selectedPost!.isCancelled = !this.selectedPost?.isCancelled;
                this.posts.set(this.selectedPost!.id, this.selectedPost!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }

    }

    updateAttendeeFollowing = (username: string) => {
        this.posts.forEach(post => {
            post.attendees.forEach(attendee => {
                if (attendee.username === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
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
        const user = store.userStore.user;

        if (user) {
            post.isGoing = post.attendees.some(
                a => a.username === user.username
            )
            post.isHost = post.hostUsername === user.username;
            post.host = post.attendees.find(x => x.username === post.hostUsername)
        }

        post.date = new Date(post.date);
        this.posts.set(post.id, post);
    }
}