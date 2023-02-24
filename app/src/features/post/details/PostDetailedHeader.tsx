import format from 'date-fns/format'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Header, Icon, Image, Item, Segment } from "semantic-ui-react";
import { IPost } from '../../../app/models/IPost';
import { useStore } from '../../../app/stores/store';

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

export default observer(function PostDetailedHeader({ post }: Props) {
    const { postStore: { updateAttendence, cancelPostToggle, loading } } = useStore();

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
                                <p>{format(post.date, 'MM/dd/yyyy')}</p>
                                <p>
                                    Hosted by
                                    <strong>
                                        <Link to={`/profile/${post.host?.username}`}>
                                            {' ' + post.host?.displayName}
                                        </Link>
                                    </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {post.isHost ? (
                    <>
                        <Button
                            color={post.isCancelled ? 'green' : 'red'}
                            floated='left'
                            content={post.isCancelled ? 'Re-activate Post' : 'Cancel Post'}
                            onClick={cancelPostToggle}
                            loading={loading}
                        />
                        <Dropdown
                            as={Button}
                            floated='right'
                            color='yellow'
                            text='Manage Post'
                            floating
                            labeled
                            className='button icon'
                        >
                            <Dropdown.Menu style={{ fontSize: 13 }}>
                                <Dropdown.Item as={Link} to={`/form/manage/${post.id}`}>
                                    <Icon name='pencil' /> Edit
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Icon name='trash' /> Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) : post.isGoing ? (
                    <Button floated='left' loading={loading} color='red' onClick={() => updateAttendence()}>Cancel attendance</Button>
                ) : (
                    <Button
                        disabled={post.isCancelled}
                        loading={loading} onClick={() => updateAttendence()} color='teal'>
                        Join Activity
                    </Button>
                )}
            </Segment>
        </Segment.Group >
    )
})