import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { IPost } from "../../../models/IPost";

interface Props {
    post: IPost;
    cancelSelectPost: () => void;
    openForm: (id: string) => void;
}

export default function PostDetails({ post, cancelSelectPost, openForm }: Props) {

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
                    <Button onClick={cancelSelectPost} basic color="grey" content='Back' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}