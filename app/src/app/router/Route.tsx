import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import PostDashboard from "../../features/post/dashboard/PostDashboard";
import PostDetails from "../../features/post/details/PostDetails";
import PostForm from "../../features/post/form/PostForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'dashboard', element: <PostDashboard /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'post/:id', element: <PostDetails /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'form/create', element: <PostForm key='create' /> },
            { path: 'form/manage/:id', element: <PostForm key='manage' /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
]

export const router = createBrowserRouter(routes);