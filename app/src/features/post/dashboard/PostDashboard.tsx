import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridRow } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CalendarFilter from "./filter/CalendarFilter";
import PostFilter from "./filter/PostFilter";
import SearchBar from "./filter/SearchBar";
import PostList from "./list/PostList";

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { listPosts, posts } = postStore;

    useEffect(() => {
        if (posts.size <= 0) listPosts();
    }, [listPosts, posts.size])

    if (postStore.loadingInitial) return <LoadingComponent content='Loading app..' />

    return (
        <Grid>
            <GridRow centered>
                <SearchBar />
                <PostFilter />
                <CalendarFilter />
            </GridRow>
            <Grid.Column width='12' style={{ margin: 'auto' }}>
                <PostList />
            </Grid.Column>
        </Grid>
    )
})