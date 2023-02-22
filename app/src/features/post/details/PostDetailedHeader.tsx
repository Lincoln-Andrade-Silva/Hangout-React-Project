import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { IPost } from '../../../app/models/IPost';

const postImageStyle = {
    filter: 'brightness(30%)'
};

const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    post: IPost
}

export default observer(function postDetailedHeader({ post }: Props) {

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }} >
                <Image src={`/assets/categoryImages/${post.category}.jpg`} fluid style={postImageStyle} />
                <Segment style={postImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={post.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{post.date}</p>
                                <p>
                                    Hosted by
                                    <strong>
                                        User
                                    </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <>
                    <Button color='teal'>Join Activity</Button>
                    <Button>Cancel attendance</Button>
                    <Button as={Link}
                        to={`/form/manage/${post.id}`}
                        color='yellow'
                        floated='right'
                        content='Manage Event'
                    />
                </>
            </Segment>
        </Segment.Group >
    )
})