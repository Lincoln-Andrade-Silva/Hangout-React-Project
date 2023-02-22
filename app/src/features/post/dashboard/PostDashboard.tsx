import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostFilter from "./filter/PostFilter";
import PostList from "./list/PostList";

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { listPosts, posts } = postStore;

    useEffect(() => {
        if (posts.size <= 0) listPosts();
    }, [listPosts])

    if (postStore.loadingInitial) return <LoadingComponent content='Loading app..' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6'>
                <PostFilter />
            </Grid.Column>
        </Grid>
    )
})