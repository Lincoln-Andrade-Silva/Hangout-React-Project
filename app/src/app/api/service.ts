import axios, { AxiosError, AxiosResponse } from 'axios';
import 'dotenv';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IPaginatedResult } from '../models/IPaginationModels';
import { IPost, PostFormValues } from '../models/IPost';
import { IPhoto, IProfile, IUserPost } from '../models/IProfile';
import { IUser, IUserFormValues } from '../models/IUser';
import { router } from '../router/Route';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const postModule = '/post';
const accountModule = '/account';
const response = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response! as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors: any = [];
                for (const key in data.errors) {
                    if (data.errors[key]) modalStateErrors.push(data.errors[key])
                }
                throw modalStateErrors.flat();
            } else {
                if (config.method === 'get' && data === "Invalid Guid") {
                    router.navigate('/not-found')
                }
                toast.error(data)
            }
            break;
        case 401:
            toast.warning('Unauthorized')
            break;
        case 403:
            toast.error('Forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
    }

    return Promise.reject(error);
});

const requests = {
    get: <T>(url: string) => axios.get(url).then(response),
    post: <T>(url: string, body: {}) => axios.post(url, body).then(response),
    put: <T>(url: string, body: {}) => axios.put(url, body).then(response),
    delete: <T>(url: string) => axios.delete<T>(url).then(response)
}

const post = {
    list: () => requests.get(postModule),
    listWithFilter: (params: URLSearchParams) => axios.get<IPaginatedResult<IPost[]>>(postModule, { params }).then(response),
    details: (id: string) => requests.get<IPost>(`${postModule}/${id}`),
    create: (post: PostFormValues) => requests.post<IPost>(postModule, post).then(() => { toast.success('Success') }),
    edit: (post: PostFormValues) => requests.put<IPost>(`${postModule}/${post.id}`, post).then(() => { toast.success('Success') }),
    delete: (id: string) => requests.delete<void>(`${postModule}/${id}`),
    attend: (id: string) => requests.post<void>(`${postModule}/${id}/attend`, {})
}

const account = {
    current: () => requests.get<IUser>(accountModule),
    login: (user: IUserFormValues) => requests.post<IUser>(accountModule + '/login', user),
    register: (user: IUserFormValues) => requests.post<IUser>(accountModule + '/register', user),
}

const profiles = {
    get: (username: string) => requests.get<IProfile>(`/profile/${username}`),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowing: (username: string, predicate: string) =>
        requests.get<IProfile[]>(`/follow/${username}?predicate=${predicate}`),
    listPosts: (username: string, predicate: string) =>
        requests.get<IUserPost[]>(`/profile/${username}/posts?predicate=${predicate}`),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}).then().then(() => { toast.success('Success') }),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`).then(() => { toast.success('Success') }),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<IPhoto>('photos', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((response) => { toast.success('Success'); return response })
    },
}

const service = {
    post,
    account,
    profiles
}

export default service;