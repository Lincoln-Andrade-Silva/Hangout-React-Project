import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function PostDetails() {
    const { id } = useParams();
    const { postStore } = useStore();
    const { selectedPost: post, loadPost, loadingInitial } = postStore;

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost])

    if (loadingInitial || !post) { return <LoadingComponent content="Loading post..."/> }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${post.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                    <span>{post.date}</span>
                </Card.Meta>
                <Card.Description>
                    {post.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button as={Link} to={`/form/manage/${post.id}`} basic color="yellow" content="Edit" />
                    <Button as={Link} to={`/dashboard`} basic color="grey" content='Back' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
})