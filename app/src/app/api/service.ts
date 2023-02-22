import axios, { AxiosResponse } from 'axios';
import { IPost } from '../models/IPost';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const postModule = '/Post';
const response = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
});

const requests = {
    get: <T>(url: string) => axios.get(url).then(response),
    post: <T>(url: string, body: {}) => axios.post(url, body).then(response),
    put: <T>(url: string, body: {}) => axios.patch(url, body).then(response),
    delete: <T>(url: string) => axios.delete(url).then(response)
}

const post = {
    list: () => requests.get(postModule),
    details: (id: string) => requests.get<IPost>(`${postModule}/${id}`),
    create: (post: IPost) => axios.post<IPost>(postModule, post),
    edit: (post: IPost) => axios.put<IPost>(`${postModule}/${post.id}`, post),
    delete: (id: string) => requests.delete<IPost>(`${postModule}/${id}`)
}

const service = {
    post
}

export default service;