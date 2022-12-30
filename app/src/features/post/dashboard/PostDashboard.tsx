import React from 'react';
import { Grid } from "semantic-ui-react";
import { IPost } from "../../../app/models/IPost";
import PostDetails from "../details/PostDetails";
import PostForm from '../form/PostForm';
import PostList from "./list/PostList";

interface PostArray {
    posts: IPost[];
    selectedPost: IPost | undefined;
    selectPost: (id: string) => void;
    cancelSelectPost: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrUpdatePost: (post: IPost) => void;
    deletePost: (id: string) => void;
    submitting: boolean;
}

export default function PostDashboard({ posts, selectedPost, selectPost, cancelSelectPost, editMode, openForm, closeForm, createOrUpdatePost, deletePost, submitting }: PostArray) {

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList
                    posts={posts}
                    selectPost={selectPost}
                    deletePost={deletePost}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode &&
                    <PostDetails
                        post={selectedPost}
                        cancelSelectPost={cancelSelectPost}
                        openForm={openForm}
                    />}
                {editMode &&
                    <PostForm
                        closeForm={closeForm}
                        post={selectedPost}
                        createOrUpdatePost={createOrUpdatePost}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
}