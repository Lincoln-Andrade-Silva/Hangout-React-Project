import { createBrowserRouter, RouteObject } from "react-router-dom";
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
            { path: 'post/:id', element: <PostDetails /> },
            { path: 'form/create', element: <PostForm /> },
            { path: 'form/manage/:id', element: <PostForm /> },
        ]
    }
]

export const router = createBrowserRouter(routes);