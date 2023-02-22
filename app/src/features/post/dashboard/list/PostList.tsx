import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import PostListItem from "./PostListItem";

export default observer(function PostList() {
    const { postStore } = useStore();
    const { groupedPosts } = postStore;

    return (
        <>
            {groupedPosts.map(([group, posts]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {posts.map(post => (
                        <PostListItem key={post.id} post={post} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})