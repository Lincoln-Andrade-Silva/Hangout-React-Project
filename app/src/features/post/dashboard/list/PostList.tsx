import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import PostListItem from "./PostListItem";

export default observer(function PostList() {
    const { postStore } = useStore();
    const { groupedPosts } = postStore;

    const dateStyle = {
        color: "white", fontSize: 13, backgroundColor: '#3d4489', padding: 10, width: 100, borderRadius: 30, textAlign: 'center'
    }

    return (
        <>
            {groupedPosts.map(([group, posts]) => (
                <Fragment key={group}>
                    <Header style={dateStyle}>
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