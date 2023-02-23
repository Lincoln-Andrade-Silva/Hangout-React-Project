import axios, { AxiosError, AxiosResponse } from 'axios';
import 'dotenv';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IPost } from '../models/IPost';
import { IPaginatedResult } from '../models/IPaginationModels';
import { router } from '../router/Route';
import { useStore } from '../stores/store';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const postModule = '/Post';
const response = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response! as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) modalStateErrors.push(data.errors[key])
                }
                throw modalStateErrors.flat();
            } else {
                if (config.method === 'get' && data == "Invalid Guid") {
                    router.navigate('/not-found')
                }
                toast.error(data)
            }
            break;
        case 401:
            toast.warning('Unauthorised')
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
    put: <T>(url: string, body: {}) => axios.patch(url, body).then(response),
    delete: <T>(url: string) => axios.delete<T>(url).then(response)
}

const post = {
    list: () => requests.get(postModule),
    listWithFilter: (params: URLSearchParams) => axios.get<IPaginatedResult<IPost[]>>(postModule, { params }).then(response),
    details: (id: string) => requests.get<IPost>(`${postModule}/${id}`),
    create: (post: IPost) => axios.post<IPost>(postModule, post),
    edit: (post: IPost) => axios.put<IPost>(`${postModule}/${post.id}`, post),
    delete: (id: string) => requests.delete<void>(`${postModule}/${id}`)
}

const service = {
    post
}

export default service;