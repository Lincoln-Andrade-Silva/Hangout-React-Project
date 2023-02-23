import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostFilter from "./filter/PostFilter";
import SearchBar from "./filter/SearchBar";
import PostList from "./list/PostList";

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { listPosts, posts, predicate, setPredicate } = postStore;

    useEffect(() => {
        if (posts.size <= 0) listPosts();
    }, [listPosts])

    if (postStore.loadingInitial) return <LoadingComponent content='Loading app..' />

    return (
        <Grid>
            <GridRow centered>
                <SearchBar />
                <PostFilter />
            </GridRow>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6' style={{ marginTop: 28 }}>
                <Calendar
                    onChange={(date: Date) => setPredicate('startDate', date as Date)}
                    value={predicate.get('startDate' || new Date())}
                />
            </Grid.Column>
        </Grid>
    )
})