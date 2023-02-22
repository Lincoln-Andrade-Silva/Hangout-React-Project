import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function PostDetails() {
    const { postStore } = useStore();
    const { selectedPost: post, openForm, cancelSelectedPost } = postStore;

    if (!post) { return <LoadingComponent /> }

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
                    <Button onClick={() => openForm(post.id)} basic color="yellow" content="Edit" />
                    <Button onClick={cancelSelectedPost} basic color="grey" content='Back' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}